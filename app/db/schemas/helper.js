'use strict';

import UserSchema from '../migrations/v1/user';
import PdfSchema from '../migrations/v1/pdf';
import SidekiqSchema from '../migrations/v1/sidekiq';
import QuestionSchema from '../migrations/v1/question';
import AnswerSchema from '../migrations/v1/answer';
import CriteriaSchema from '../migrations/v1/criteria';
import SkipLogicShema from '../migrations/v1/skip_logic';
import CategoryShema from '../migrations/v1/category';

const schemaNames = [
  "User",
  "Pdf",
  "Sidekiq",
  "Criteria",
  "SkipLogic",
  "Answer",
  "Question",
  "Category",
]

const schemaHelper = (() => {
  return { getSchemas };

  function getSchemas(changedSchemas) {
    // changedSchemas parameter format (e.g: [label: 'Language', data: LanguageSchema])
    // schames order must be the same order to migration constant
    const schemas = [
      UserSchema,
      PdfSchema,
      SidekiqSchema,
      CriteriaSchema,
      SkipLogicShema,
      AnswerSchema,
      QuestionSchema,
      CategoryShema,
    ];

    changedSchemas.map((schema) => {
      const index = schemaNames.indexOf(schema.label);
      schemas[index] = schema.data;
    })

    return schemas;
  }
})();

export default schemaHelper;
