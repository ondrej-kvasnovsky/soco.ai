export class ReadDocsRequest {
  skip?: number;
  limit?: number;
  filters?: { [key: string]: string };
  sort_key?: string[];
  sort_direction?: number[];
  return_fields?: { [key: string]: string };
}
