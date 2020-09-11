import { readOperations } from '../../../../src';

import { getTestConfig } from '../../getTestConfig';
import { addSampleDocs } from '../../doc/add/addSampleDocs';

describe('readOperations', () => {
  it('returns operations', async () => {
    await addSampleDocs();

    const operations = await readOperations(0, 10, -1, getTestConfig());

    expect(operations).toBeDefined();
  });
});
