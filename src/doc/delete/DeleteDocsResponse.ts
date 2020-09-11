export class DeleteDocsResponse {
  deleted: { acknowledged: boolean; deleted_count: number };
  op_id?: string;
}
