import { addSampleDocs } from '../doc/add/addSampleDocs';
import { QueryRequest } from '../../../src/search/QueryRequest';
import { getTestConfig } from '../getTestConfig';
import { autocomplete } from '../../../src/search/autocomplete';
import { cleanup } from '../cleanup';

describe('autocomplete', () => {
  beforeEach(async () => {
    // await cleanup();
  });

  // there are issues with this API/indexes, need to wait for fix by SOCO.ai
  it.skip('queries for answers using autocomplete', async () => {
    await addSampleDocs();

    const request: QueryRequest = {
      uid: 'some user ID',
      query: {
        query: 'who is Jimmy?',
        n_best: 3,
      }
    };
    const answers = await autocomplete(request, getTestConfig());

    expect(answers.length).toBeGreaterThan(0);
    expect(answers[0].tags).toEqual('Jimmy is a great and amazing guy, everyone likes him');
    expect(answers[0].text).toEqual('Jimmy is a great and amazing guy, everyone likes him');
  });
});
