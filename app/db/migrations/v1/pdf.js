'use strict';

const PdfSchema = {
  name: 'Pdf',
  primaryKey: 'code',
  properties: {
    code: 'string',
    name: 'string?',
    uri: 'string?'
  }
}

export default PdfSchema;
