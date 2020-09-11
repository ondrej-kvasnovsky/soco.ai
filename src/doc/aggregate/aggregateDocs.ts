import axios from 'axios';

import { getAdminConfig } from '../../http/getAdminConfig';
import { AggregateDocsRequest } from './AggregateDocsRequest';
import { AggregateDocsResponse } from './AggregateDocsResponse';
import { toError } from '../../http/toError';
import { Config } from '../../Config';

const URL = 'https://api.soco.ai/v1/index/aggregate';

export async function aggregateDocs(request: AggregateDocsRequest, config: Config): Promise<AggregateDocsResponse[]> {
  try {
    const response = await axios.post(URL, request, getAdminConfig(config));
    return response.data;
  } catch (error) {
    throw toError(error);
  }
}
