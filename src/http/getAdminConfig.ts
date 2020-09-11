import { Config } from '../Config';

export function getAdminConfig(config: Config) {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: config.adminApiKey,
    },
  };
}
