export class DeleteDocsRequest {
  /**
   * If doc_ids is not specified or doc_ids=null, all documents will be deleted, please be careful.
   */
  doc_ids?: string[];

  auto_index?: boolean;
}
