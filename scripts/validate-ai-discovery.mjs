import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const schema = JSON.parse(readFileSync(new URL('../docs/ai-discovery/platforms.schema.json', import.meta.url), 'utf8'));
export const directory = JSON.parse(readFileSync(new URL('../docs/ai-discovery/platforms.json', import.meta.url), 'utf8'));
export const EXPECTED_IDS = ['openai','google','microsoft','anthropic','perplexity','grok','meta','deepseek','mistral','you','poe','brave','phind','ernie','qwen','doubao','kimi','yuanbao','glm','alice','naver','apple','alexa'];

// Dependency-free validator for exactly the JSON Schema keywords used here.
// Not a general-purpose replacement for a full JSON Schema implementation.
export function validateShape(value, rule, path = '$') {
  if (rule.anyOf) {
    assert.ok(rule.anyOf.some(branch => { try { validateShape(value, branch, path); return true; } catch { return false; } }), `${path}: no anyOf branch matched`);
    return;
  }
  if ('const' in rule) assert.deepEqual(value, rule.const, `${path}: const`);
  if (rule.enum) assert.ok(rule.enum.includes(value), `${path}: enum`);
  if (rule.type) {
    const actual = value === null ? 'null' : Array.isArray(value) ? 'array' : typeof value;
    assert.ok(rule.type === 'integer' ? Number.isInteger(value) : actual === rule.type, `${path}: expected ${rule.type}`);
  }
  if (typeof value === 'string') {
    if (rule.minLength) assert.ok(value.trim().length >= rule.minLength, `${path}: empty string`);
    if (rule.format === 'uri') assert.equal(new URL(value).protocol, 'https:', `${path}: HTTPS URL required`);
    if (rule.format === 'date-time') assert.ok(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value)), `${path}: ISO timestamp required`);
  }
  if (typeof value === 'number') {
    if ('minimum' in rule) assert.ok(value >= rule.minimum, `${path}: minimum`);
    if ('maximum' in rule) assert.ok(value <= rule.maximum, `${path}: maximum`);
  }
  if (Array.isArray(value)) {
    if ('minItems' in rule) assert.ok(value.length >= rule.minItems, `${path}: minItems`);
    if ('maxItems' in rule) assert.ok(value.length <= rule.maxItems, `${path}: maxItems`);
    value.forEach((item, index) => validateShape(item, rule.items, `${path}[${index}]`));
  } else if (value && typeof value === 'object') {
    for (const key of rule.required ?? []) assert.ok(Object.hasOwn(value, key), `${path}.${key}: required`);
    for (const [key, item] of Object.entries(value)) {
      if (rule.additionalProperties === false) assert.ok(Object.hasOwn(rule.properties, key), `${path}.${key}: unexpected field`);
      if (rule.properties?.[key]) validateShape(item, rule.properties[key], `${path}.${key}`);
    }
  }
}
export function validateDirectory(data) {
  validateShape(data, schema);
  assert.deepEqual([...data.platforms.map(p => p.id)].sort(), [...EXPECTED_IDS].sort(), 'exactly 23 unique requested platform IDs');
  const sources = new Map(data.sources.map(source => [source.id, source]));
  assert.equal(sources.size, data.sources.length, 'unique source IDs');
  function source(id, readable = false) {
    assert.ok(sources.has(id), `missing source ${id}`);
    const record = sources.get(id);
    assert.notEqual(record.httpStatus, 404, `remove/replace 404 source ${id}`);
    if (readable) { assert.equal(record.access, 'content_fetched', `${id}: claim needs fetched content`); assert.equal(record.httpStatus, 200, `${id}: claim needs successful fetch`); }
    return record;
  }
  for (const record of data.sources) source(record.id);
  for (const p of data.platforms) {
    const website = source(p.officialWebsite.sourceId);
    assert.ok([website.url, website.finalUrl].includes(p.officialWebsite.url), `${p.id}: website must match checked source`);
    const verified = p.discovery.status === 'verified';
    assert.equal(p.lastVerification.contentVerifiedAt !== null, verified, `${p.id}: honest verification timestamp`);
    assert.equal(p.lastVerification.coverage === 'official_content_fetched', verified, `${p.id}: coverage consistency`);
    if (verified) assert.ok(p.discovery.sourceIds.length, `${p.id}: capability sources required`);
    p.discovery.sourceIds.forEach(id => source(id, true));
    p.crawlers.sourceIds.forEach(id => source(id, true));
    if (p.crawlers.documentationStatus !== 'verified') assert.equal(p.crawlers.agents.length, 0, `${p.id}: no guessed agents`);
    const tokens = new Set();
    for (const agent of p.crawlers.agents) {
      assert.equal(p.crawlers.documentationStatus, 'verified');
      assert.ok(p.crawlers.sourceIds.includes(agent.sourceId), `${p.id}: crawler doc reference`);
      source(agent.sourceId, true);
      assert.ok(!tokens.has(agent.token), `${p.id}: duplicate agent`); tokens.add(agent.token);
      assert.equal(new Set(agent.purposes).size, agent.purposes.length);
      assert.ok(!(agent.purposes.includes('training') && agent.purposes.includes('search')), `${p.id}: do not conflate search with training`);
      if (['Google-Extended','Applebot-Extended'].includes(agent.token)) assert.equal(agent.kind, 'robots_control_token');
    }
    for (const mechanism of p.publicSubmission.mechanisms) {
      const checked = source(mechanism.sourceId, true);
      assert.ok([checked.url, checked.finalUrl].includes(mechanism.url), `${p.id}: checked submission documentation URL`);
    }
    if (p.publicSubmission.mechanismStatus === 'unknown') assert.equal(p.publicSubmission.mechanisms.length, 0);
    if (p.publicSubmission.mechanismStatus === 'documented_indirect') assert.ok(p.publicSubmission.mechanisms.length && p.publicSubmission.mechanisms.every(m => m.relationship === 'indirect_search_index'));
  }
  return { platforms: data.platforms.length, fetchedCapabilityRecords: data.platforms.filter(p => p.discovery.status === 'verified').length, unknownCapabilityRecords: data.platforms.filter(p => p.discovery.status === 'unknown').length, submissions: data.submissionCount };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) console.log(JSON.stringify(validateDirectory(directory), null, 2));
