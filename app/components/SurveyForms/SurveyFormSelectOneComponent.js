import React from 'react';
import {useSelector} from 'react-redux';
import RadioButton from '../Questions/radioButton';

const SurveyFormSelectOneComponent = (props) => {
  const {options} = props;
  const [selectedOption, setSelectedOption] = React.useState(null);
  const currentUser = useSelector(state => state.currentUser)
  const currentQuiz = useSelector(state => state.currentQuiz)

  const onSelect = (id) => {
    const option = options.filter(o => o.id.toString() == id)[0]
    setSelectedOption(option);

    const answerParams = {
      question_id: props.question.id,
      question_code: props.question.code,
      value: option.value,
      score: option.score,
      user_uuid: currentUser.uuid,
      quiz_uuid: currentQuiz.uuid,
    }
    // console.log('select one params = ', answerParams)
    props.updateAnswer(answerParams);
  }

  return options.map(option => {
    return <RadioButton
              key={option.id}
              label={option.name}
              checked={ !!selectedOption ? option.id.toString() == selectedOption.id : false }
              value={option.id.toString()}
              onSelect={id => onSelect(id)}
              avata={option.imageSource}
            />
  })
}

export default SurveyFormSelectOneComponent;