import React from 'react';

import RadioButton from '../Questions/radioButton';
import Option from '../../models/Option';

const SurveyFormSelectOneComponent = (props) => {
  const options = Option.byQuestion(props.question.id)
  return options.map(option => {
    return <RadioButton
              key={option.id}
              label={option.name}
              checked={option.id.toString() == props.answer}
              value={option.id.toString()}
              onSelect={id => {
                let selectedOption = options.filter(o => o.id.toString() == id)[0];
                props.updateAnswer(id, selectedOption);
              }}
              avata={option.imageSource}
            />
  })
}

export default SurveyFormSelectOneComponent;