export class QueryResponse {
  query: string;
  results: FoundItem[];
  timestamp: string;
  took: number;
}

export class FoundItem {
  _id: string;
  a: {
    act: string;
    highlight_value: string;
    type: string;
    value: string;
  };
  a_key: string;
  index: string;
  meta: {
    _chunk_id: string;
    _chunk_type: string;
    _doc_id: string;
    doc_id: string;
    keywords: { keyword: string; score: number }[];
    tuples: { object: string; relation: string; stem_subject: string; subject: string }[];
  };
  norm_q: string;
  score: number;
}
