import { reindex } from '../../../src';
import { ReindexRequest } from '../../../src';
import { addSampleDocs } from '../doc/add/addSampleDocs';
import { getTestConfig } from '../getTestConfig';

describe('reindex', () => {
  it('reindex two indexes', async () => {
    await addSampleDocs();

    const request: ReindexRequest = {
      params: { qa: {}, qq: {} }
    };
    const answers = await reindex(request, getTestConfig(), true);

    expect(answers.op_id).toBeDefined();
  });

  it('reindex only qa index', async () => {
    await addSampleDocs();

    const request: ReindexRequest = {
      params: { qa: {} }
    };
    const answers = await reindex(request, getTestConfig(), true);

    expect(answers.op_id).toBeDefined();
  });
});
