import { metadataDocument } from "./metadata";

export type queryResponse = {
    id: string;
    title: string;
    content: string;
    score: number;
    metadata: metadataDocument;
};