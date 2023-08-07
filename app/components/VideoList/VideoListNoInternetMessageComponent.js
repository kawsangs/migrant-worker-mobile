import React from 'react';
import {ActivityIndicator, Button, View, Text} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-material-ui';

const VideoListNoInternetMessageComponent = (props) => {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <Icon name='info-outline' color='#111' size={24} style={{ marginRight: 8 }} iconSet='MaterialIcons' />
        <Text>{t('InternetConnection.NoInternetConnection')}</Text>
      </View>

      <Text>{t('InternetConnection.PleaseRetry')}</Text>

      { props.showLoading && <ActivityIndicator size="small" />}

      <View style={{ marginTop: 20 }}>
        <Button title={t('InternetConnection.PleaseRetry')} onPress={() => props.retryConnection()} />
      </View>
    </View>
  )
}

export default VideoListNoInternetMessageComponent;