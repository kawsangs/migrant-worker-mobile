import { StyleSheet } from 'react-native';
import { Color } from '../assets/stylesheets/base_style';

const registerHelper = (() => {
  return {
    validationBorder
  }

  function validationBorder(value, fieldName, isFormValid) {
    if (isFormValid)
      return {}

    if (!value)
      return fieldName == 'sex' ? styles.invalidGenderBorder : styles.invalidBorder;

    return {}
  }
})();

const styles = StyleSheet.create({
  invalidBorder: {
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: Color.red
  },
  invalidGenderBorder: {
    borderWidth: 1.5,
    borderRadius: 8,
    borderColor: Color.red,
    paddingHorizontal: 4,
    paddingVertical: 8
  },
})

export default registerHelper;