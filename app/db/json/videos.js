const videoList = [
  {
    "code": "01",
    "title": "Intro to the App",
    "url": "https://www.youtube.com/watch?v=kQ-83Nt3EvU&t=14s",
    "category": "all"
  },
  {
    "code": "02",
    "title": "Know before you go",
    "url": "https://www.youtube.com/watch?v=ZsP4kYUpwaI",
    "category": "your_journey"
  },
  {
    "code": "03",
    "title": "Know your Rights",
    "url": "https://www.youtube.com/watch?v=4PstnUwKYYQ",
    "category": "your_safety"
  },
  {
    "code": "04",
    "title": "SAF Programme",
    "url": "https://www.youtube.com/watch?v=69vG5JOMfrY",
    "category": "about_safe_and_fair"
  },
  {
    "code": "05",
    "title": "Saving Tips",
    "url": "https://www.youtube.com/watch?v=RgeKg5iGZKI&list=RDCMUCsMW60l4zLO11NB6ckap57g",
    "category": "coming_home"
  },
  {
    "code": "06",
    "title": "Successful Migration",
    "url": "https://www.youtube.com/watch?v=P7C7fBGmk_Q",
    "category": "coming_home"
  },
  {
    "code": "07",
    "title": "Sarah’s Story",
    "url": "https://www.youtube.com/watch?v=NnyEiC8MzQs",
    "category": "your_safety"
  },
  {
    "code": "08",
    "title": "Spotlight initiative",
    "url": "https://www.youtube.com/watch?v=mqyvYk2nkVA",
    "category": "about_safe_and_fair"
  },
  {
    "code": "09",
    "title": "Sexual harassment",
    "url": "https://www.youtube.com/watch?v=RoJEu_sMfJ0",
    "category": "your_safety"
  },
  {
    "code": "10",
    "title": "Contraception",
    "url": "https://www.youtube.com/watch?v=X4mbTPncojk",
    "category": "your_safety"
  },
  {
    "code": "11",
    "title": "Speak Up",
    "url": "https://www.youtube.com/watch?v=UrkNgSuwQMM&t=255s",
    "category": "your_safety"
  },
  {
    "code": "12",
    "title": "Safe workplace, Safe community",
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
    "stepTitle": "អំពី Safe and Fair",
  }
];

const listData = videoSteps.map(step => {
  return {
    ...step,
    list: step.stepCode == 'all' ? videoList : videoList.filter(x => x.category == step.stepCode)
  }
})

export default listData;
