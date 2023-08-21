'use strict';

import UserSchema from '../migrations/v1/user';
import PdfSchema from '../migrations/v1/pdf';
import SidekiqSchema from '../migrations/v1/sidekiq';

import CategorySchema from '../migrations/v1/category';

import FormSchema from '../migrations/v1/form';
import QuestionSchema from '../migrations/v1/question';
import OptionSchema from '../migrations/v1/option';

import QuizSchema from '../migrations/v1/quiz';
import AnswerSchema from '../migrations/v1/answer';
import CriteriaSchema from '../migrations/v1/criteria';

import CategoryImageShema from '../migrations/v1/category_image';
import CountrySchema from '../migrations/v1/country';
import InstitutionSchema from '../migrations/v1/institution';
import ContactSchema from '../migrations/v1/contact';

import CountryInstitutionSchema from '../migrations/v1/country_institution';
import NotificationSchema from '../migrations/v1/notification';
import VideoSchema from '../migrations/v4/video';
import SectionSchema from '../migrations/v4/section';

const schemaNames = [
  "User",
  "Pdf",
  "Sidekiq",
  "Category",
  "Form",
  "Question",
  "Option",
  "Quiz",
  "Answer",
  "Criteria",
  "Country",
  "Institution",
  "Contact",
  "CountryInstitution",
  "Notification",
  "Video",
  "Section",
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
      CategorySchema,
      FormSchema,
      QuestionSchema,
      OptionSchema,
      QuizSchema,
      AnswerSchema,
      CriteriaSchema,
      CountrySchema,
      InstitutionSchema,
      ContactSchema,
      CountryInstitutionSchema,
      NotificationSchema,
      VideoSchema,
      SectionSchema,
    ];

    changedSchemas.map((schema) => {
      const index = schemaNames.indexOf(schema.label);
      schemas[index] = schema.data;
    })

    return schemas;
  }
})();

export default schemaHelper;
