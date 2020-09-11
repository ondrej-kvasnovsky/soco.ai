import { Config } from '../Config';

export function getClientConfig(config: Config) {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.queryApiKey,
    },
  };
}
