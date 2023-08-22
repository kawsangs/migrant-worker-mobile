import React from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import RadioButton from '../Questions/radioButton';
import { Color } from '../../assets/stylesheets/base_style';

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

  return options.map(option => {
    return <View key={option.id} style={{minHeight: 48, paddingVertical: 6, borderBottomWidth: 1, borderColor: Color.divideLineColor}}>
              <RadioButton
                label={option.name}
                checked={ !!selectedOption ? option.id.toString() == selectedOption.id : false }
                value={option.id.toString()}
                onSelect={id => onSelect(id)}
                avata={option.imageSource}
              />
           </View>
  })
}

export default SurveyFormSelectOneComponent;