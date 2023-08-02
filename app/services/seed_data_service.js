import Video from '../models/Video';

const seedDataService = (() => {
  return {
    seedToRealm
  }

  function seedToRealm() {
    Video.getAll().length == 0 && Video.seedData();
  }
})()

export default seedDataService;