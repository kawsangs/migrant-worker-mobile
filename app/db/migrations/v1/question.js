'use strict';

// const QuestionSchema = {
//   name: 'Questionnaire',
//   primaryKey: 'code',
//   properties: {
//     order: 'string',
//     code: 'string',
//     type: 'string',
//     question: 'string',
//     options: [
//       {
//         id: 'string',
//         title: 'string',
//         weight: 'double'
//       }
//     ],
//     skip_logic: {
//       operator: 'string',
//       criterias: [
//         {
//           code: 'string',
//           operator: 'string',
//           value: ['string']
//         }
//       ]
//     }
//   }
// };


const QuestionSchema = {
  name: 'Question',
  // primaryKey: 'code',
  properties: {
    order: 'int',
    code: 'string',
    type: 'string',
    question: 'string',
    options: { type: 'list', objectType: 'Answer' },
    skip_logic: 'SkipLogic'
  }
};



export default QuestionSchema;
