import test from 'node:test';
import assert from 'node:assert/strict';
import { directory, validateDirectory } from './validate-ai-discovery.mjs';
const copy = () => structuredClone(directory);

test('directory meets schema and exact 23-platform coverage', () => { assert.equal(validateDirectory(directory).platforms, 23); });
test('duplicate or missing requested platform is rejected', () => { const d=copy(); d.platforms[22]=d.platforms[0]; assert.throws(() => validateDirectory(d)); });
test('unknown crawler specification has no default guessed agent', () => { const d=copy(); d.platforms.find(p=>p.id==='phind').crawlers.agents.push({token:'PhindBot',kind:'http_user_agent',purposes:['search'],sourceId:'phind'}); assert.throws(()=>validateDirectory(d)); });
test('blocked and shell-only sources cannot verify a capability', () => { const d=copy(); const p=d.platforms.find(p=>p.id==='qwen'); p.discovery.status='verified'; p.discovery.sourceIds=['qwen']; p.lastVerification.contentVerifiedAt=p.lastVerification.attemptedAt; p.lastVerification.coverage='official_content_fetched'; assert.throws(()=>validateDirectory(d)); });
test('nullable unknown verification timestamp is supported', () => { const p=directory.platforms.find(p=>p.id==='phind'); assert.equal(p.lastVerification.contentVerifiedAt,null); assert.equal(p.discovery.status,'unknown'); });
test('training/grounding controls are not HTTP crawler UAs', () => { const d=copy(); d.platforms.find(p=>p.id==='google').crawlers.agents.find(a=>a.token==='Google-Extended').kind='http_user_agent'; assert.throws(()=>validateDirectory(d)); });
test('search and training purposes cannot be conflated', () => { const d=copy(); d.platforms[0].crawlers.agents[0].purposes.push('training'); assert.throws(()=>validateDirectory(d)); });
test('missing required fields and unexpected properties are rejected', () => { const d=copy(); delete d.platforms[0].officialWebsite; assert.throws(()=>validateDirectory(d)); const extra=copy(); extra.platforms[0].guaranteedRanking=true; assert.throws(()=>validateDirectory(extra)); });
test('404 recommended sources are rejected', () => { const d=copy(); d.sources[0].httpStatus=404; assert.throws(()=>validateDirectory(d)); });
test('unperformed submissions cannot acquire submitted status', () => { const d=copy(); d.platforms[0].submissionStatus='SUBMITTED'; assert.throws(()=>validateDirectory(d)); });
test('dates are ISO and unknown does not get a verified date', () => { const d=copy(); d.platforms[0].lastVerification.attemptedAt='today'; assert.throws(()=>validateDirectory(d)); const other=copy(); other.platforms.find(p=>p.id==='phind').lastVerification.contentVerifiedAt=other.reviewedAt; assert.throws(()=>validateDirectory(other)); });
test('Google Search Console is indirect, not a Gemini app submission', () => { const p=directory.platforms.find(p=>p.id==='google'); assert.equal(p.publicSubmission.mechanismStatus,'documented_indirect'); assert.ok(p.publicSubmission.mechanisms.every(m=>m.relationship==='indirect_search_index')); });
test('Brave documentation does not result in an invented Bravebot', () => { const p=directory.platforms.find(p=>p.id==='brave'); assert.equal(p.crawlers.documentationStatus,'verified'); assert.deepEqual(p.crawlers.agents,[]); });
