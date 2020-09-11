import { getOperationStatus } from './getOperationStatus';
import { toError } from '../../http/toError';
import { Config } from '../../Config';

/**
 * @see https://docs.soco.ai/soco-api/system-management-1/op-management
 */
export async function waitUntilFinished(opId: string, config: Config): Promise<void> {
  if (!opId) return;
  let status;
  try {
    status = await getOperationStatus(opId, config);
    while (status.status !== 'finished' && status.status !== 'failed') {
      await wait();
      status = await getOperationStatus(opId, config);
    }
  } catch (error) {
    throw toError(error);
  }
  if (status?.status === 'failed') {
    const e = new Error();
    e.name = 'Waiting on operation failed';
    e.message = `Reason: ${status.status}.`;
    for (const key of Object.keys(status.progress)) {
      const p = status.progress[key];
      e.message += ` ${p.queue} ${p.error}`;
    }
    throw e;
  }
}

export function wait(ms: number = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
