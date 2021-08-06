const videoList = [
  {
    "code": "01",
    "title": "សេចក្តីណែនាំពីកម្មវិធីដំណើរឆ្លងដែនរបស់ខ្ញុំ",
    "url": "https://www.youtube.com/watch?v=kQ-83Nt3EvU&t=14s",
    "category": "all"
  },
  {
    "code": "02",
    "title": "អ្វីដែលអ្នកគួរដឹងមុននឹងឆ្លងដែន",
    "url": "https://www.youtube.com/watch?v=ZsP4kYUpwaI",
    "category": "your_journey"
  },
  {
    "code": "03",
    "title": "ដឹងពីសិទ្ធិរបស់អ្នកនៅកន្លែងធ្វើការ",
    "url": "https://www.youtube.com/watch?v=4PstnUwKYYQ",
    "category": "your_safety"
  },
  {
    "code": "04",
    "title": "អំពីកម្មវិធី សុវត្ថិភាព និងយុត្តិធម៌",
    "url": "https://www.youtube.com/watch?v=69vG5JOMfrY",
    "category": "about_safe_and_fair"
  },
  {
    "code": "05",
    "title": "គន្លឹះនៃការសន្សំប្រាក់",
    "url": "https://www.youtube.com/watch?v=RgeKg5iGZKI&list=RDCMUCsMW60l4zLO11NB6ckap57g",
    "category": "coming_home"
  },
  {
    "code": "06",
    "title": "ដំណើរឆ្លងដែនជោគជ័យ",
    "url": "https://www.youtube.com/watch?v=P7C7fBGmk_Q",
    "category": "coming_home"
  },
  {
    "code": "07",
    "title": "សាច់រឿងរបស់សារ៉ា",
    "url": "https://www.youtube.com/watch?v=NnyEiC8MzQs",
    "category": "your_safety"
  },
  {
    "code": "08",
    "title": "គំនិតផ្តួចផ្តើម ស្ពតឡៃត៍",
    "url": "https://www.youtube.com/watch?v=mqyvYk2nkVA",
    "category": "about_safe_and_fair"
  },
  {
    "code": "09",
    "title": "ការបៀតបៀនផ្លូវភេទនៅកន្លែងធ្វើការ",
    "url": "https://www.youtube.com/watch?v=RoJEu_sMfJ0",
    "category": "your_safety"
  },
  {
    "code": "10",
    "title": "មធ្យោបាយពន្យារកំណើត",
    "url": "https://www.youtube.com/watch?v=X4mbTPncojk",
    "category": "your_safety"
  },
  {
    "code": "11",
    "title": "និយាយឡើង",
    "url": "https://www.youtube.com/watch?v=UrkNgSuwQMM&t=255s",
    "category": "your_safety"
  },
  {
    "code": "12",
    "title": "កន្លែងធ្វើការសុវត្ថិភាព សហគមន៍សុវត្ថិភាព",
    "url": "https://www.youtube.com/watch?v=5B-ev5IGGKY",
    "category": "your_safety"
  }
];

const videoSteps = [
  {
    "stepCode": "all",
    "stepTitle": "ទាំងអស់"
  },
  {
    "stepCode": "your_journey",
    "stepTitle": "ដំណើរឆ្លងដែនរបស់អ្នក"
  },
  {
    "stepCode": "your_safety",
    "stepTitle": "សុវត្ថិភាពរបស់អ្នក"
  },
  {
    "stepCode": "coming_home",
    "stepTitle": "ត្រឡប់មកផ្ទះវិញ",
  },
  {
    "stepCode": "about_safe_and_fair",
    "stepTitle": "សុវត្ថិភាព និងយុត្តិធម៌",
  }
];

const listData = videoSteps.map(step => {
  return {
    ...step,
    list: step.stepCode == 'all' ? videoList : videoList.filter(x => x.category == step.stepCode)
  }
})

export default listData;
