import { PHONE, FACEBOOK } from '../constants/contact_constant';

const contactHelper = (() => {
  return {
    getContactLink,
  };

  function getContactLink(type, value) {
    switch (type.toLowerCase()) {
      case PHONE:
        return `tel:${value}`;
      case FACEBOOK:
        return value;
      default:
        return value.replace(/\s/g, '');
    }
  }
})();

export default contactHelper;