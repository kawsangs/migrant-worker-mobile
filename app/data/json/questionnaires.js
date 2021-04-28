export default [
  {
    order: 1,
    code: 'question_1',
    answer_type: 'list',
    question_type: 'multiple_choice',
    question_en: '1. What is your purpose there?',
    question_kh: '1. តើអ្នកមានគោលបំណងអ្វីនៅទីនោះ?',
    options: [
      {
        id: 1,
        title_en: 'Answer A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A',
        title_kh: 'ចម្លើយ ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក',
        weight: 0.50
      },
      {
        id: 2,
        title_en: 'Answer B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B',
        title_kh: 'ចម្លើយ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ',
        weight: 0.70
      },
      {
        id: 3,
        title_en: 'Answer C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C',
        title_kh: 'ចម្លើយ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ',
        weight: 0.85
      },
      {
        id: 4,
        title_en: 'Answer D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D',
        title_kh: 'ចម្លើយ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ',
        weight: 0.50
      },
    ],
    skip_logic: null
  },
  {
    order: 2,
    code: 'question_2',
    answer_type: 'card',
    question_type: 'multiple_choice',
    question_en: '2. What is your purpose there?',
    question_kh: '2. តើអ្នកមានគោលបំណងអ្វីនៅទីនោះ?',
    options: [
      {
        id: 1,
        title_en: 'Answer A',
        title_kh: 'ចម្លើយ ក',
        weight: 0.50
      },
      {
        id: 2,
        title_en: 'Answer B',
        title_kh: 'ចម្លើយ ខ',
        weight: 0.70
      },
      {
        id: 3,
        title_en: 'Answer C',
        title_kh: 'ចម្លើយ គ',
        weight: 0.85
      },
      {
        id: 4,
        title_en: 'Answer D',
        title_kh: 'ចម្លើយ ឃ',
        weight: 0.50
      },
    ],
    skip_logic: {
      operator: 'and',
      criterias: [
        {
          code: 'question_1',
          operator: 'match_all',
          value: [1, 2]
        },
      ]
    }
  },
  {
    order: 3,
    code: 'question_3',
    answer_type: 'list',
    question_type: 'multiple_choice',
    question_en: '3. What is your purpose there?',
    question_kh: '3. តើអ្នកមានគោលបំណងអ្វីនៅទីនោះ?',
    options: [
      {
        id: 1,
        title_en: 'Answer A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A',
        title_kh: 'ចម្លើយ ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក',
        weight: 0.50
      },
      {
        id: 2,
        title_en: 'Answer B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B',
        title_kh: 'ចម្លើយ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ',
        weight: 0.70
      },
      {
        id: 3,
        title_en: 'Answer C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C',
        title_kh: 'ចម្លើយ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ',
        weight: 0.85
      },
      {
        id: 4,
        title_en: 'Answer D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D',
        title_kh: 'ចម្លើយ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ',
        weight: 0.50
      },
    ],
    skip_logic: {
      operator: 'and',
      criterias: [
        {
          code: 'question_1',
          operator: 'match_all',
          value: [2, 3]
        },
        {
          code: 'question_2',
          operator: 'match_all',
          value: [2]
        },
      ]
    }
  },
  {
    order: 4,
    code: 'question_4',
    answer_type: 'card',
    question_type: 'multiple_choice',
    question_en: '4. What is your purpose there?',
    question_kh: '4. តើអ្នកមានគោលបំណងអ្វីនៅទីនោះ?',
    options: [
      {
        id: 1,
        title_en: 'Answer A',
        title_kh: 'ចម្លើយ ក',
        weight: 0.50
      },
      {
        id: 2,
        title_en: 'Answer B',
        title_kh: 'ចម្លើយ ខ',
        weight: 0.70
      },
      {
        id: 3,
        title_en: 'Answer C',
        title_kh: 'ចម្លើយ គ',
        weight: 0.85
      },
      {
        id: 4,
        title_en: 'Answer D',
        title_kh: 'ចម្លើយ ឃ',
        weight: 0.50
      },
    ],
    skip_logic: {
      operator: 'or',
      criterias: [
        {
          code: 'question_2',
          operator: 'match_all',
          value: [2]
        },
        {
          code: 'question_3',
          operator: 'match_all',
          value: [3]
        },
      ]
    }
  },
  {
    order: 5,
    code: 'question_5',
    answer_type: 'list',
    question_type: 'multiple_choice',
    question_en: '5. What is your purpose there?',
    question_kh: '5. តើអ្នកមានគោលបំណងអ្វីនៅទីនោះ?',
    options: [
      {
        id: 1,
        title_en: 'Answer A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A',
        title_kh: 'ចម្លើយ ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក ក',
        weight: 0.50
      },
      {
        id: 2,
        title_en: 'Answer B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B',
        title_kh: 'ចម្លើយ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ ខ',
        weight: 0.70
      },
      {
        id: 3,
        title_en: 'Answer C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C',
        title_kh: 'ចម្លើយ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ គ',
        weight: 0.85
      },
      {
        id: 4,
        title_en: 'Answer D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D D',
        title_kh: 'ចម្លើយ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ ឃ',
        weight: 0.50
      },
    ],
    skip_logic: {
      operator: 'or',
      criterias: [
        {
          code: 'question_3',
          operator: 'match_any',
          value: [1, 2]
        },
        {
          code: 'question_4',
          operator: 'match_any',
          value: [3]
        },
      ]
    }
  },
  {
    order: 6,
    code: 'question_6',
    answer_type: 'card',
    question_type: 'multiple_choice',
    question_en: '6. What is your purpose there?',
    question_kh: '6. តើអ្នកមានគោលបំណងអ្វីនៅទីនោះ?',
    options: [
      {
        id: 1,
        title_en: 'Answer A',
        title_kh: 'ចម្លើយ ក',
        weight: 0.50
      },
      {
        id: 2,
        title_en: 'Answer B',
        title_kh: 'ចម្លើយ ខ',
        weight: 0.70
      },
      {
        id: 3,
        title_en: 'Answer C',
        title_kh: 'ចម្លើយ គ',
        weight: 0.85
      },
      {
        id: 4,
        title_en: 'Answer D',
        title_kh: 'ចម្លើយ ឃ',
        weight: 0.50
      },
    ],
    skip_logic: {
      operator: 'and',
      criterias: [
        {
          code: 'question_4',
          operator: 'match_all',
          value: [3]
        },
        {
          code: 'question_5',
          operator: 'match_all',
          value: [3]
        },
      ]
    }
  },
]
