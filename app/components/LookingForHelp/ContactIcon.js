import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { Color } from '../../assets/stylesheets/base_style';
import {contactIcons} from '../../constants/contact_constant';

const ContactIcon = (props) => {
  const contactIcon = contactIcons[props.type.toLowerCase()]
  const iconComponents = {
    'materialCommunity': MaterialCommunityIcon,
    'fontawesome5': FontAwesome5Icon,
    'ionicons': IonIcon,
    'fontawesome': FontAwesomeIcon,
  }

  return React.createElement(iconComponents[contactIcon.type], {
          name: contactIcon.name,
          size: contactIcon.size || 24,
          color: Color.yellow,
          style: {width: 25}
        });
}


export default ContactIcon;