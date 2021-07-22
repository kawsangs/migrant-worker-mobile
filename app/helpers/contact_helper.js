import { PHONE, FACEBOOK, WHATSAPP } from '../constants/contact_constant';

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
      case WHATSAPP:
        return `https://api.whatsapp.com/send?phone=${value}`;
      default:
        return value.replace(/\s/g, '');
    }
  }
})();

export default contactHelper;