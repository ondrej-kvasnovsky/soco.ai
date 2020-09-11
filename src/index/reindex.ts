import axios from 'axios';

import { Config } from '../Config';
import { ReindexResponse } from './ReindexResponse';
import { toError } from '../http/toError';
import { getAdminConfig } from '../http/getAdminConfig';
import { waitUntilFinished } from '..';

const URL = 'https://api.soco.ai/v1/index/reindex';

export async function reindex(config: Config, waitUntilOpFinished = false): Promise<ReindexResponse> {
  try {
    const response = await axios.post(URL, {}, getAdminConfig(config));
    const data = response.data;
    if (waitUntilOpFinished) {
      await waitUntilFinished(data.op_id, config);
    }
    return data;
  } catch (error) {
    throw toError(error);
  }
}
