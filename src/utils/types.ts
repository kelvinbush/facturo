import type { ContentChunk } from "@mistralai/mistralai/models/components/index.js";

export interface ChatResponse {
  text: string | ContentChunk[] | null | undefined;
  error?: string;
}
