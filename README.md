# SOCO.ai JavaScript/TypeScript Client

[SOCO.ai](https://www.soco.ai) client for NodeJS.

## Install

```bash
npm install soco.ai
```

## Usage

```typescript
import { SocoClient, Config } from 'soco.ai';

const config: Config = {
  adminApiKey: '...', // needed for calling of Admin APIs
  clientId: '...', // needed for calling query APIs & Parse Doc API
  queryApiKey: '...',// needed for calling query APIs
};
const client = new SocoClient(config);
```

### Query / Search

```typescript
import { QueryRequest } from 'soco.ai';
const request: QueryRequest = {
  uid: 'ID of the end user',
  query: {
    query: 'who is Jimmy?',
    n_best: 3
  }
};
const answers = await client.query(request);
```

### Waiting for Operation to Finish

It is possible to pass `waitUntilOpFinished` to `SocoClient` functions, that call APIs that return an operation ID, 
which will make the function wait until the operation is finished or failed. 
The default value of `waitUntilOpFinished` is `false`. If `waitUntilOpFinished` set to `true`, 

```
const operationId = '...';
const status = client.waitUntilFinished(operationId);
```

### Add documents

```typescript
import { AddDocsRequest } from 'soco.ai';

const request: AddDocsRequest = {
  data: [
    {
      data: [{ text: 'there was bear called Jimmy', type: 'content' }],
      meta: { doc_id: '123' },
      doc_type: 'soco_doc'
    }
  ],
  auto_index: true
};

const response = await client.addDocs(request, true);
```

### Add FAQs from CSV files

```typescript
const filePath = 'test/e2e/fixtures/dataset-1'; // dir with CSV files 
const response = await client.addFAQsFromCSVs(filePath, {}, true, true);
```

### Add unstructured data (PDF or MS Word)

```typescript
import { ParseDocRequest } from 'soco.ai';
const parseRequest: ParseDocRequest = {
  client_id: 'a client ID',
  file_type: 'url',
  file_url: 'http://qiiip.org/Adobe Acrobat Reader FAQs.pdf',
  lang: 'en',
};

const response = await client.addUnstructuredDoc(parseRequest, undefined, true, true);
```

### Read documents

```typescript
import { ReadDocsRequest } from 'soco.ai';

const request: ReadDocsRequest = {};
const response = await client.readDocs(request);
```

### Update documents

```typescript
import { UpdateDocsRequest } from 'soco.ai';
const request: UpdateDocsRequest = {
  data: [
    {
      _id: '...',
      data: [{ text: 'ok, lets talk about something else', type: 'content' }],
      meta: { someMeta: 'mata info is mandatory' },
      doc_type: 'soco_doc'
    }
  ]
};

const response = await client.updateDocs(request, true);
```

### Delete documents

If `data` is left empty or undefined, it removes all the documents.

```typescript
import { DeleteDocsRequest } from 'soco.ai';
export const request: DeleteDocsRequest = {
  doc_ids: undefined,
  auto_index: false,
};

const response = await client.deleteDocs(request, true);
```

### Reindex

```typescript
const answers = await client.reindex();
```

### Refresh

```typescript
const request: RefreshRequest = {
  params: { lm: {}, qa: {}, kw: {}, qq: {}, tuple: {} }
};
const answers = await client.refresh(request);
```

### Get operation status

```typescript
const operationId = response.op_id;
const status = await client.getOperationStatus(operationId);
```

### Get operations

```typescript
const operations = await client.readOperations(0, 10, -1);
```
