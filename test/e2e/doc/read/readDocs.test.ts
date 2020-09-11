import { addSampleDocs } from '../add/addSampleDocs';
import { readDocs } from '../../../../src';
import { ReadDocsRequest } from '../../../../src';
import { getTestConfig } from '../../getTestConfig';
import { cleanup } from '../../cleanup';

describe('readDocs', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('reads all docs', async () => {
    await addSampleDocs();

    const request: ReadDocsRequest = {};
    const response = await readDocs(request, getTestConfig());

    expect(response.length).toEqual(2);
  });
});
