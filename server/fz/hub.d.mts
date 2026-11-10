export function renderHub(now: number): string;
export function fzHandle(request: Request, env: unknown, url: URL): Promise<Response | undefined>;
export function fzPost(request: Request, res: Response): Response | Promise<Response>;
