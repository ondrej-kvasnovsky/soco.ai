export class ParseDocRequest {
  file_url: string;
  client_id?: string;
  file_type: 'url' | string;
  lang: 'en' | 'zh' | string;
}
