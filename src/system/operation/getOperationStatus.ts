import axios from 'axios';

import { getAdminConfig } from '../../http/getAdminConfig';
import { OperationStatus } from './OperationStatus';
import { toError } from '../../http/toError';
import { Config } from '../../Config';

/**
 * https://docs.soco.ai/soco-api/system-management-1/op-management
 */
export async function getOperationStatus(opId: string, config: Config): Promise<OperationStatus> {
  try {
    const URL = `https://api.soco.ai/v1/op/status/${opId}`;
    const response = await axios.get(URL, getAdminConfig(config));
    return response.data;
  } catch (error) {
    throw toError(error);
  }
}
