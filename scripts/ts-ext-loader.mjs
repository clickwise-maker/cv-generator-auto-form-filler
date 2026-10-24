// Test-only resolve hook: lets `node --experimental-transform-types` load app
// modules that use Vite-style imports ("./model", "@/lib/cv/model").
import { registerHooks } from "node:module";

const SRC = new URL("../src/", import.meta.url);

registerHooks({
  resolve(specifier, context, next) {
    if (specifier.startsWith("@/")) specifier = new URL(specifier.slice(2), SRC).href;
    try {
      return next(specifier, context);
    } catch (error) {
      const relative = specifier.startsWith("./") || specifier.startsWith("../") || specifier.startsWith("file:");
      if (relative && !/\.[cm]?[jt]sx?$/.test(specifier)) return next(`${specifier}.ts`, context);
      throw error;
    }
  },
});
