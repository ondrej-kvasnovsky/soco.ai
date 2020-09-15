export class QueryRequest {
  uid: string;
  query: {
    query: string;
    n_best: number;
    skip?: number;
    /**
     * qa - questions and answers
     * faq - frequently asked qa
     * lm - language model
     * qa_faq - returns qa and faq in one request
     * qa_faq_combine - returns qna and faq together in one list, sorted by score
     */
    func_type?: 'faq' | 'qa' | 'lm' | 'qa_faq' | 'qa_faq_combine' | string;
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
