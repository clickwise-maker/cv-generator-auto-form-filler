import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { previewPathRewrite } from "@/lib/preview-path-prefix";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  return createRouter({
    routeTree,
    // Public locale middleware owns canonical slashes; preserve legacy app URLs.
    trailingSlash: "preserve",
    rewrite: previewPathRewrite(),
    defaultErrorComponent: AppErrorComponent,
  });
}
