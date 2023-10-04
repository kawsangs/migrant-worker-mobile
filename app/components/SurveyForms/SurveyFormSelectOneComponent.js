import React from 'react';
import {useSelector} from 'react-redux';
import { RadioButton } from 'react-native-paper';
import RadioButtonComponent from '../shared/RadioButtonComponent';

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
    props.updateAnswer(answerParams);
  }

  return (
    <RadioButton.Group value={!!selectedOption ? selectedOption.id.toString() : null}>
      {
        options.map(option => {
          return <RadioButtonComponent
                    key={option.id}
                    label={option.name}
                    value={option.id.toString()}
                    onPress={(value) => onSelect(value)}
                    selectedValue={selectedOption}
                    isSelected={!!props.currentAnswer && props.currentAnswer.value == option.value}
                />
        })
      }
    </RadioButton.Group>
  )
}

export default SurveyFormSelectOneComponent;