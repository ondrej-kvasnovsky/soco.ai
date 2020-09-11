import _ from 'lodash';

export function toError(error: any): Error {
  const e = new Error();
  e.stack = error.stack;
  e.name = 'Calling SOCO.ai API failed';
  if (error.isAxiosError) {
    e.message = `${error.response?.statusText} ${error.response?.status}. ${error.response?.data?.message}`;
  }
  if (e.message === undefined || _.trim(e.message) === '') {
    e.message = `${error.name} ${error.message}. ${error.stack}`;
  }
  return e;
}
