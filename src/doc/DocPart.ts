import { Part } from './Part';

export class DocPart implements Part {
  type: 'title' | 'section' | 'content';
  text: string;
}
