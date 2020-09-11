import axios from 'axios';

import { toError } from '../http/toError';
import { getAdminConfig } from '../http/getAdminConfig';
import { Config } from '../Config';
import { RefreshRequest } from './RefreshRequest';
import { RefreshResponse } from './RefreshResponse';
import { waitUntilFinished } from '..';

const URL = 'https://api.soco.ai/v1/index/refresh';

export async function refresh(
  request: RefreshRequest,
  config: Config,
  waitUntilOpFinished = false
): Promise<RefreshResponse> {
  try {
    const response = await axios.post(URL, request, getAdminConfig(config));
    const data = response.data;
    if (waitUntilOpFinished) {
      await waitUntilFinished(data.op_id, config);
    }
    return data;
  } catch (error) {
    throw toError(error);
  }
}
