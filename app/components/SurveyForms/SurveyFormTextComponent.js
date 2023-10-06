import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import {useSelector} from 'react-redux';

import { Color } from '../../assets/stylesheets/base_style';

const SurveyFormTextComponent = (props) => {
  const [answer, setAnswer] = useState('');
  const currentUser = useSelector(state => state.currentUser)
  const currentQuiz = useSelector(state => state.currentQuiz)

  useEffect(() => {
    setAnswer(!!props.currentAnswer ? props.currentAnswer.value : '');
  }, []);

  const updateAnswer = () => {
    if (!answer) return props.updateAnswer(null);

    const answerParams = {
      question_id: props.question.id,
      question_code: props.question.code,
      user_uuid: currentUser.uuid,
      quiz_uuid: currentQuiz.uuid,
      value: answer || '',
    }
    props.updateAnswer(answerParams)
  }


  return <TextInput
            value={answer}
            style={{borderWidth: 1.5, paddingHorizontal: 10, marginTop: 10, borderRadius: 10, borderColor: !answer ? Color.red : Color.gray}}
            onBlur={() => updateAnswer()}
            onChangeText={(value) => setAnswer(value)}
         />
}

export default SurveyFormTextComponent;