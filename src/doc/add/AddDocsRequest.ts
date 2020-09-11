import { Doc } from '../Doc';

export class AddDocsRequest {
  data: Doc[];
  auto_index: boolean;
}
