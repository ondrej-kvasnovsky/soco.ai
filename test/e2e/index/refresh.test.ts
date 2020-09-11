import { refresh, RefreshRequest } from '../../../src';
import { addSampleDocs } from '../doc/add/addSampleDocs';
import { getTestConfig } from '../getTestConfig';
import { cleanup } from '../cleanup';

describe('refresh', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('refreshes an index', async () => {
    await addSampleDocs();

    const request: RefreshRequest = {
      params: { lm: {}, qa: {}, kw: {}, qq: {}, tuple: {} },
    };
    const answers = await refresh(request, getTestConfig());

    expect(answers.op_id).toBeDefined();
  });
});
