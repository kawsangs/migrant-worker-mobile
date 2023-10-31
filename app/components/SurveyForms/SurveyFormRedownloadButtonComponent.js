import React, {useState} from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import NetInfo from "@react-native-community/netinfo";

import { Color, FontFamily, FontSize } from '../../assets/stylesheets/base_style';
import SurveyFormService from '../../services/survey_form_service';

const noInternetMessage = 'មិនមានកម្រងសំណួរនៃការស្ទង់មតិដែលអាចបណ្ដាលមកពីមិនមានប្រព័ន្ធអ៊ីនធឺណិត។ សូមចុចប៊ូតុងខាងក្រោមដើម្បីទាញយកកម្រងសំណួរនៃការស្ទង់មតិ។';

const SurveyFormRedownloadButtonComponent = (props) => {
  const [message, setMessage] = useState(noInternetMessage);
  const [icon, setIcon] = useState('wifi-off');
  const [isLoading, setIsLoading] = useState(false);

  const downloadSurveyForm = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        setIsLoading(true);
        new SurveyFormService().findAndSave(props.formId, () => {
          props.setForm()
          setIsLoading(false);
        }, (error) => {
          setMessage('មានបញ្ហារអាក់រអួលក្នុងការទាញយកការស្ទង់មតិ។ សូមពិនិត្យមើលប្រព័ន្ធអ៊ីនធឺណិតរបស់អ្នកហើយព្យាយាមម្តងទៀត។');
          setIcon('info');
          setIsLoading(false);
        });
      }
      else
        setMessage(noInternetMessage);
    });
  }

  const renderMessage = () => {
    return (
      <React.Fragment>
        <Icon name={icon} size={85} color={Color.lightGray} style={{marginTop: -30}} />
        <Text style={{fontFamily: FontFamily.body, marginBottom: 26, marginTop: 16}}>
          {message}
        </Text>

        <TouchableOpacity onPress={() => downloadSurveyForm()} mode="contained"
          style={{borderRadius: 6, height: 48, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: Color.primary, paddingHorizontal: 16}}
        >
          <Icon name='download' size={20} color={Color.white} />
          <Text style={{fontFamily: FontFamily.body, fontSize: FontSize.body, color: Color.white, lineHeight: 28, marginLeft: 8}}>ទាញយកការស្ទង់មតិ</Text>
        </TouchableOpacity>
      </React.Fragment>
    )
  }

  return (
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center', paddingHorizontal: 16}}>
      {
        isLoading ? <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color={Color.primary} /></View>
        : renderMessage()
      }
    </View>
  )
}

export default SurveyFormRedownloadButtonComponent;