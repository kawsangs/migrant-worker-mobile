import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CheckboxComponent from '../shared/CheckboxComponent';

const SurveyFormSelectMultipleComponent = (props) => {
  const {options} = props;
  const [answers, setAnswers] = useState([])
  const currentUser = useSelector(state => state.currentUser)
  const currentQuiz = useSelector(state => state.currentQuiz)

  useEffect(() => {
    setAnswers(getSelectedId())
  }, []);

  const getSelectedId = () => {
    let selectedIds = [];
    if (!!props.currentAnswer && !!props.currentAnswer.value) {
      props.currentAnswer.value.split(',').map(value => {
        const filteredOption = options.filter(option => option.value == value)[0]
        selectedIds.push(filteredOption.id)
      });
    }
    return selectedIds
  }

  const onCheckOption = (option, value) => {
    let newAnswers = getSelectedId();
    let index = newAnswers.indexOf(parseInt(value));
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
      let answeredOptions = [];
      newAnswers.map(newAnswer => {
        answeredOptions.push(options.filter(option => newAnswer == option.id.toString())[0])
      });
      answerParams.value = answeredOptions.map(o => o.value).join(',');
    }
    props.updateAnswer(answerParams);
  }

  const renderOptions = () => {
    return options.map(option => {
      return <CheckboxComponent
                key={option.id}
                label={option.name}
                value={option.id.toString()}
                selected={answers.includes(option.id)}
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