import { refresh, RefreshRequest } from '../../../src';
import { addSampleDocs } from '../doc/add/addSampleDocs';
import { getTestConfig } from '../getTestConfig';

describe('refresh', () => {
  it('refreshes an index', async () => {
    await addSampleDocs();

    const request: RefreshRequest = {
      params: { lm: {}, qa: {}, kw: {}, qq: {}, tuple: {} },
    };
    const response = await refresh(request, getTestConfig(), true);

    expect(response.op_id).toBeDefined();
  });
});
