import React from 'react';
import { View, Text } from 'react-native';

import { FontFamily } from '../../assets/stylesheets/base_style';

const AboutSafeAndFairDescription = () => {
  return (
    <View>
      <Text>
        <Text style={{fontFamily: FontFamily.title}}>កម្មវិធីអ៊ែប ដំណើរឆ្លងដែនរបស់ខ្ញុំ </Text>
        បានកសាងឡើងដោយបណ្តាញទូរសព្ទ័ជំនួយកុមារកម្ពុជា​ (CHC) និងអ៊ែបវិស្វករ InSTEDD ដែលជាផលិតផលក្រោមកម្មវិធី
        <Text style={{fontFamily: FontFamily.title}}> សុវត្ថិភាព និងយុត្តិធម៌ </Text>
        សម្រេចឲ្យបាននូវសិទ្ធិ និងឱកាសរបស់ពលករស្រ្តីក្នុងតំបន់អាស៊ីអាគ្នេយ៍ (ASEAN) គឺជាផ្នែកមួយនៃគំនិតផ្តួចផ្តើម Spotlight ដើម្បីលុបបំបាត់រាល់ទម្រង់អំពើហិង្សាលើស្ត្រី និងក្មេងស្រីជាគំនិតផ្តួចផ្តើមជាសកលអនុវត្តច្រើនឆ្នាំរវាងសហភាពអឺរ៉ុប និងអង្គការសហប្រជាជាតិ។
      </Text>

      <Text style={{marginTop: 15}}>
        ការអនុវត្តកម្មវិធី
        <Text style={{fontFamily: FontFamily.title}}> សុវត្ថិភាព និងយុត្តិធម៌ </Text>
        ធ្វើឡើងតាមរយៈភាពជាដៃគូ ILO និង UN Women (ដោយសហការជាមួយ UNODC)។ កម្មវិធីអ៊ែបនេះគឺជាប្រភពព័ត៌មានជាសាធារណៈមួយដែលបង្កើតឡើងសម្រាប់ប្រើប្រាស់ដោយមិនមានការគិតថ្លៃ និងមានបំណងឲ្យប្រើប្រាស់ស្របតាមគោលបំណងរបស់អ៊ែប។​
      </Text>
    </View>
  )
}

export default AboutSafeAndFairDescription;