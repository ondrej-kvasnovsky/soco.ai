export class Operation {
  _id: string;
  generation_time: string;
  index_progress: { init: { done: number; total: number } };
  job_ids: { job_id: string; queue: string }[];
  name: string;
  task_id: string;
}
