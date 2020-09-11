import { reindex } from '../../../src';
import { addSampleDocs } from '../doc/add/addSampleDocs';
import { getTestConfig } from '../getTestConfig';
import { cleanup } from '../cleanup';

describe('reindex', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('reindex everything', async () => {
    await addSampleDocs();

    const answers = await reindex(getTestConfig());

    expect(answers.op_id).toBeDefined();
  });
});
