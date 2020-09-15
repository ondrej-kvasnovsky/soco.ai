export class QueryRequest {
  uid: string;
  query: {
    query: string;
    n_best: number;
    skip?: number;
    /**
     * qa - is finding the answer directly in the text
     * faq - is finding the most similar questions
     * lm - language model, is the task to predict the next work. For example, the output of lm(“nice to meet”) will be “you”.
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
