const videoList = [
  {
    "code": "01",
    "url": "https://www.youtube.com/watch?v=ttSsAGmpC_U",
    "title": "CTIP Ambassador Gives Safe Migration Advice to the People of Cambodia",
    "category": "departure"
  },
  {
    "code": "02",
    "url": "https://www.youtube.com/watch?v=Lsd-wDnQC1o",
    "title": "យុទ្ធនាការធ្វើចំណាកស្រុកដោយសុវត្ថិភាពអាស៊ាន - ខ្មែរ",
    "category": "departure"
  },
  {
    "code": "03",
    "url": "https://www.youtube.com/watch?v=0CVF4Om6KT4",
    "title": "ពលករមួយរូបបង្ហាញបទពិសោធន៍ចំណាកស្រុកដោយសុវត្ថិភាព",
    "category": "departure"
  },
  {
    "code": "04",
    "url": "https://www.youtube.com/watch?v=l8gf4labqVw",
    "title": "ខ្សែវីដេអូចំណាកស្រុកដោយសុវត្ថិភាព៖ Know Before You Go",
    "category": "departure"
  },
  {
    "code": "05",
    "url": "https://www.youtube.com/watch?v=3huHzKQ6KQM",
    "title": "ការធ្វើចំណាកស្រុក ដោយសុវត្ថភាព",
    "category": "departure"
  },
  {
    "code": "06",
    "url": "https://www.youtube.com/watch?v=MygplobHhTQ&list=RDCMUCsMW60l4zLO11NB6ckap57g&index=9",
    "title": "ចំណេះដឹងដ៏ល្អក្នុងការសន្សំលុយ!",
    "category": "departure"
  },
  {
    "code": "07",
    "url": "https://www.youtube.com/watch?v=RgeKg5iGZKI&list=RDCMUCsMW60l4zLO11NB6ckap57g&index=28",
    "title": "វិធីសន្សំលុយងាយៗ",
    "category": "departure"
  },
  {
    "code": "09",
    "url": "https://www.youtube.com/watch?v=P7C7fBGmk_Q",
    "title": "ចំណាកស្រុកដោយជោគជ័យ (Successful Migration)",
    "category": "safety"
  },
  {
    "code": "10",
    "url": "https://www.youtube.com/watch?v=3LBkILLtj3I",
    "title": "ឯកសារចាំបាច់សម្រាប់ការធ្វើចំណាកស្រុក",
    "category": "safety"
  },
  {
    "code": "11",
    "url": "https://www.youtube.com/watch?v=9fjLUf6Cz08",
    "title": "បញ្ហាប្រឈមរបស់ពលករចំណាកស្រុក",
    "category": "safety"
  },
  {
    "code": "12",
    "url": "https://www.youtube.com/watch?v=9lj8dJPetYQ",
    "title": "គ្រោះថ្នាក់នៃការចំណាកស្រុកដោយខុសច្បាប់",
    "category": "safety"
  },
  {
    "code": "13",
    "url": "https://www.youtube.com/watch?v=F552JNOb9CM",
    "title": "រឿងនិទានរបស់អ្នកបំរើ",
    "category": "safety"
  },
  {
    "code": "15",
    "url": "https://www.youtube.com/watch?v=oJ9Kpkyz2e4",
    "title": "វិលត្រឡប់វិញ Retuning Home",
    "category": "safety"
  }
];

const videoSteps = [
  {
    "stepCode": "all",
    "stepTitle": "ទាំងអស់"
  },
  {
    "stepCode": "departure",
    "stepTitle": "ដំណើរឆ្លងដែនរបស់អ្នក"
  },
  {
    "stepCode": "safety",
    "stepTitle": "សុវត្ថិភាពរបស់អ្នក"
  }
];

const listData = videoSteps.map(step => {
  return {
    ...step,
    list: step.stepCode == 'all' ? videoList : videoList.filter(x => x.category == step.stepCode)
  }
})

export default listData;
