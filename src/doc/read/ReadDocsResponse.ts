export class ReadDocsResponse {
  _id: string;
  creation_time: string;
  creation_timestamp: number;
  data: any[];
  doc_size: number;
  doc_type: string;
  is_indexed: boolean;
  meta: { [key: string]: string };
  task_id: string;
}
