import Moment from 'moment';

export const getTranslatedDate = (date) => {
  const months = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
  
  const day = Moment(date).format('DD');
  let month = parseInt(Moment(date).format('M')) - 1;
  month = months[month];
  const year = Moment(date).format('YY');

  return `${day} ${month} ${year}`;
}