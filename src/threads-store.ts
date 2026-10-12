import type { TfsReviewThread } from "./types.ts";

export interface ThreadsSnapshot {
  readonly pullRequestId: string;
  readonly threads: readonly TfsReviewThread[];
}

let snapshot: ThreadsSnapshot = { pullRequestId: "", threads: [] };
export function setThreads(pullRequestId: string, threads: readonly TfsReviewThread[]): void {
  snapshot = { pullRequestId, threads: Object.freeze([...threads]) };
}

export function clearThreads(): void {
  snapshot = { pullRequestId: "", threads: [] };
}

/** Threads that touch a given review path (leading slash tolerant). */
export function threadsForPath(path: string): readonly TfsReviewThread[] {
  const normalized = path.replace(/^\/+/, "");
  return snapshot.threads.filter((thread) => {
    const filePath = thread.position?.filePath.replace(/^\/+/, "");
    return filePath === normalized;
  });
}
