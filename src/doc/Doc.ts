import { Part } from './Part';

export class Doc {
  data: Part[];
  meta: { [key: string]: string } | { doc_id: string };
  doc_type: 'soco_doc' | 'soco_faq';
}
