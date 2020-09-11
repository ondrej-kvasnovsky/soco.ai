import { Part } from './Part';

export class FAQPart implements Part {
  answer: { value: string };
  questions: { value: string; displayable: boolean }[];
  meta: { [key: string]: string };
}

// {
//   "data": [
//   {
//     "answer": {
//       "value": "My name is Mr.SOCO"
//     },
//     "questions": [
//       {
//         "value": "what is your name?",
//         "displayable": true
//       }
//     ],
//     "meta": {
//       "category": "identity"
//     }
//   },
//   {
//     "answer": {
//       "value": "I am an AI assistance."
//     },
//     "questions": [
//       {
//         "value": "what do you do?",
//         "displayable": false
//       }
//     ],
//     "meta": {
//       "category": "profession"
//     }
//   }
// ],
//   "meta": {
//   "src": "chat"
// },
//   "doc_type": "soco_faq"
// }
