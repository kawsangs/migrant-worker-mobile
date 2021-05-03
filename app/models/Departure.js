// import realm from '../db/schema';

const Departure = (() => {
  return {
    getAll,
  }

  function getAll() {
    // return realm.objects('Category').filtered(`type='Departure'`);

    return [
      {
        title_en: 'Prepare your trip',
        title_kh: 'រៀបចំដំណើររបស់អ្នក',
        image: require('../assets/images/icons/before_you_go_prepare_your_trip.png'),
        screenName: 'PreDepartureListScreen',
        imageWidth: '480',
        imageHeight: '360',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Migration',
        title_kh: 'ចំណាកស្រុក',
        image: require('../assets/images/icons/before_you_go_migration.png'),
        screenName: 'MigrationScreen',
        imageWidth: '300',
        imageHeight: '372',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Coming Home',
        title_kh: 'ដំណើរវិលត្រឡប់',
        image: require('../assets/images/icons/before_you_go_coming_home.png'),
        screenName: 'ComingHomeScreen',
        imageWidth: '440',
        imageHeight: '344',
        audioFileName: '',
        backgroundColor: Color.red
      },
      {
        title_en: 'Video',
        title_kh: 'វីដេអូ',
        image: require('../assets/images/icons/before_you_go_video.png'),
        screenName: 'BeforeYouGoVideoScreen',
        imageWidth: '440',
        imageHeight: '344',
        audioFileName: '',
        backgroundColor: Color.red
      },
    ];
  }
})();

export default Departure;
