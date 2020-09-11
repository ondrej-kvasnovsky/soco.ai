import { ParseDocRequest } from '../../../src';
import { addUnstructuredDoc } from '../../../src';
import { addFAQsFromCSVs } from '../../../src';
import { query } from '../../../src/search/query';
import { addSampleDocs } from '../doc/add/addSampleDocs';
import { QueryRequest } from '../../../src/search/QueryRequest';
import { getTestConfig } from '../getTestConfig';
import { cleanup } from '../cleanup';

describe('query', () => {
  beforeEach(async () => {
    await cleanup();
  });

  it('queries for answers', async () => {
    await addSampleDocs();
    const request: QueryRequest = {
      uid: 'some user ID',
      query: {
        query: 'who is Jimmy?',
        n_best: 3,
      },
    };
    const answers = await query(request, getTestConfig());

    expect(answers.results[0].a.value).toEqual('Jimmy is a great and amazing guy, everyone likes him');
  });

  it('queries for answers from PDF file', async () => {
    const parseRequest: ParseDocRequest = {
      client_id: getTestConfig().clientId,
      file_type: 'url',
      file_url: 'http://qiiip.org/Adobe Acrobat Reader FAQs.pdf',
      lang: 'en',
    };

    await addUnstructuredDoc(parseRequest, undefined, true, getTestConfig(), true);

    const request: QueryRequest = {
      uid: 'some user ID',
      query: {
        query: 'can I put my signature into a document?',
        n_best: 3,
      },
    };
    const answers = await query(request, getTestConfig());

    expect(answers.results[0].a.value).toEqual(
      'Just open any PDF file, sign by typing or drawing your signature, or using an image.'
    );
  });

  it('queries for answers from CSV FAQ file', async () => {
    const filePath = 'test/e2e/fixtures/dataset-1';
    await addFAQsFromCSVs(filePath, undefined, true, getTestConfig(), true);

    const request: QueryRequest = {
      uid: 'some user ID',
      query: {
        query: 'how are you?',
        n_best: 3,
        func_type: 'faq',
      },
    };
    const answers = await query(request, getTestConfig());

    expect(answers.results[0].a.value).toEqual('I am doing fine');
  });
});
