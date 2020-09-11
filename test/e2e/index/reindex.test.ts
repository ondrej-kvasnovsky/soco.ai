import { reindex } from '../../../src';
import { addSampleDocs } from '../doc/add/addSampleDocs';
import { getTestConfig } from '../getTestConfig';

describe('reindex', () => {
  it('reindex everything', async () => {
    await addSampleDocs();

    const answers = await reindex(getTestConfig());

    expect(answers.op_id).toBeDefined();
  });
});
