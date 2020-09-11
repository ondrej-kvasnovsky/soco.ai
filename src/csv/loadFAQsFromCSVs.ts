import path from 'path';
import fs from 'fs-extra';
import { parseString } from 'fast-csv';
import { FAQPart } from '..';

export async function loadFAQsFromCSVs(rootDir: string): Promise<FAQPart[]> {
  const files = await fs.readdir(rootDir);
  const csvFiles = files.filter((file: string) => file.endsWith('.csv'));
  const result: any[] = [];
  for (const csvFile of csvFiles) {
    const content = (await fs.readFile(path.join(rootDir, csvFile))).toString();
    const subResult = await parseCsvFile(content);
    result.push(...subResult);
  }
  return result;
}

export async function parseCsvFile(content: string): Promise<FAQPart[]> {
  const result: any[] = [];
  await new Promise((resolve, reject) => {
    parseString(content, { headers: true, trim: true })
      .on('error', (error: Error) => reject(error))
      .on('data', (row: any) => {
        result.push(row);
      })
      .on('end', (rowCount: number) => resolve(result));
  });

  const set: any = {};
  for (const row of result) {
    if (set[row.answer]) {
      set[row.answer].push(row);
    } else {
      set[row.answer] = [row];
    }
  }
  const parts: FAQPart[] = [];
  for (const key of Object.keys(set)) {
    const row = set[key];
    const questions = set[key];
    let faqPart = new FAQPart();
    faqPart.questions = [];
    for (const question of questions) {
      faqPart.answer = { value: question.answer };
      faqPart.questions.push({ value: question.question, displayable: true });
      faqPart.meta = { category: 'identity' };
      // faqPart.meta[] = question.domain; TODO: add the rest of fields as meta
    }
    parts.push(faqPart);
  }
  return parts;
}
