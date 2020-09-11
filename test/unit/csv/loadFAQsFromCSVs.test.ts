import { loadFAQsFromCSVs } from '../../../src';

describe('loadFAQsFromCSVs', () => {
  it('adds CSV file', async () => {
    const filePath = 'test/unit/fixtures/dataset-1';
    const response = await loadFAQsFromCSVs(filePath);

    expect(response).toEqual([
      {
        answer: { value: 'I am doing fine' },
        meta: { category: 'identity' },
        questions: [{ displayable: true, value: 'how are you doing' }],
      },
      {
        answer: { value: 'It is fine' },
        meta: { category: 'identity' },
        questions: [{ displayable: true, value: 'how is life' }],
      },
      {
        answer: { value: 'I am 42 years old' },
        meta: { category: 'identity' },
        questions: [{ displayable: true, value: 'how old are you' }],
      },
    ]);
  });
});
