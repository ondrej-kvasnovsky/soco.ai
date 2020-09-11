export class OperationStatus {
  _id: string;
  generation_time: string;
  name: string;
  progress: Map<string, Progress>;
  status: string;
  task_id: string;
}

export class Progress {
  done: number;
  enqueued_at: string;
  job_id: string;
  queue: string;
  res: string;
  started_at: string;
  status: string;
  total: number;
  type: string;
}
