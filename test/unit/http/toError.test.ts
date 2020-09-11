import { AxiosError, AxiosRequestConfig } from 'axios';

import { toError } from '../../../src/http/toError';

describe('toError', () => {
  it('creates a new error from axios error', async () => {
    class SampleAxiosError implements AxiosError {
      isAxiosError: boolean = true;
      message: string = 'a message';
      name: string = 'a name';
      response: {
        statusText: 'status text',
        status: 500,
        data: {
          message: 'error message'
        }
        headers: any;
        config: AxiosRequestConfig;
        request?: any;
      };
      config: AxiosRequestConfig;

      toJSON(): object {
        return { name: this.name, message: this.message, isAxiosError: this.isAxiosError };
      }
    }

    const axiosError = new SampleAxiosError();

    const error = toError(axiosError);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBeDefined();
    expect(error.message).toBeDefined();
  });

  it('creates a new error from ordinary error', async () => {
    const axiosError = new Error('a name');

    const error = toError(axiosError);

    expect(error.name).toEqual('Calling SOCO.ai API failed');
    expect(error.message).toBeDefined();
  });
});
