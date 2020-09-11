export class UpdateDocsResponse {
  op_id: string;
  updated: {
    ackowledged: boolean;
    matched_count: number;
    modified_count: number;
    upserted_id: string;
  };
}
