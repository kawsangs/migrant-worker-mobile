import React from 'react';

import SelectOne from './Questions/SelectOne';
import SelectMultiple from './Questions/SelectMultiple';
import Text from './Questions/Text';
import Result from './Questions/Result';
import uuidv4 from '../utils/uuidv4';

const Questions = {
  SelectOne,
  SelectMultiple,
  Text,
  Result,
};

export default (question={}) => {
  // component does exist
  if (!question.type) {
    return null;
  }

  const type = question.type.split('::')[1];

  if (typeof Questions[type] !== "undefined") {
    return React.createElement(Questions[type], {
      key: uuidv4(),
      question: question
    });
  }
  // component doesn't exist yet
  return React.createElement(
    () => <div>The component {type} has not been created yet.</div>,
    { key: uuidv4() }
  );
}
