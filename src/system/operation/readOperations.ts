import axios from 'axios';

import { getAdminConfig } from '../../http/getAdminConfig';
import { Operation } from './Operation';
import { toError } from '../../http/toError';
import { Config } from '../../Config';

const URL = 'https://api.soco.ai/v1/op/read';

/**
 * https://docs.soco.ai/soco-api/system-management-1/op-management
 */
export async function readOperations(skip = 0, limit = 10, sort_direction = -1, config: Config): Promise<Operation[]> {
  try {
    const request = { skip, limit, sort_direction };
    const response = await axios.post(URL, request, getAdminConfig(config));
    return response.data;
  } catch (error) {
    throw toError(error);
  }
}
