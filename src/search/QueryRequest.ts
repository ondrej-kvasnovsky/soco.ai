export class QueryRequest {
  uid: string;
  query: {
    query: string;
    n_best: number;
    skip?: number;
    func_type?: 'faq' | 'qa' | 'lm' | string;
    answer_type?: 'sentence' | 'document' | 'phrase';
    filters?: {
      exists?: { [key: string]: any };
      term?: { [key: string]: any };
      terms?: { [key: string]: any[] };
      range?: { [key: string]: any };
      ids?: { values: string[] };
    };
  };
}
