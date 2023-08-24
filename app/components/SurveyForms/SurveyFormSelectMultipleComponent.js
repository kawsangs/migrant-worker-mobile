import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import CheckboxComponent from '../shared/CheckboxComponent';

const SurveyFormSelectMultipleComponent = (props) => {
  const {options} = props;
  const [answers, setAnswers] = useState([])
  const [reload, setReload] = useState(false)
  const currentUser = useSelector(state => state.currentUser)
  const currentQuiz = useSelector(state => state.currentQuiz)

  const onCheckOption = (option, value) => {
    let newAnswers = answers || [];
    let index = newAnswers.indexOf(value);

    if (index > -1)
      newAnswers.splice(index, 1);
    else
      newAnswers.push(value);

    setAnswers(newAnswers);
    let answerParams = {
      question_id: option.question_id,
      question_code: option.question_code,
      value: '',
      score: 0,
      user_uuid: currentUser.uuid,
      quiz_uuid: currentQuiz.uuid,
    }

    if (newAnswers.length > 0) {
      const answeredOptions = options.filter(option => newAnswers.includes(option.id.toString()));
      answerParams.value = answeredOptions.map(o => o.value).join(',');
    }

    setReload(!reload)
    props.updateAnswer(answerParams);
  }

  const renderOptions = () => {
    return options.map(option => {
      return <CheckboxComponent
                key={option.id}
                label={option.name}
                value={option.id.toString()}
                selected={answers.includes(option.id.toString())}
                onPress={(value) => onCheckOption(option, value)}
              />
    });
  }

  return (
    <React.Fragment>
      { renderOptions() }
    </React.Fragment>
  )
}

export default SurveyFormSelectMultipleComponent;