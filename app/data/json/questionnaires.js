export default [
  {
    order: 1,
    code: 'question_1',
    type: 'multiple_choice',
    question: '1. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 0.50, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 0.70, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 0.85, audioFileName: '' },
      { id: 4, text: 'Answer D', weight: 0.50, audioFileName: '' },
    ],
    skip_logic: null
  },
  {
    order: 2,
    code: 'question_2',
    type: 'multiple_choice',
    question: '2. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 0.50, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 0.70, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 0.85, audioFileName: '' },
      { id: 4, text: 'Answer D', weight: 0.50, audioFileName: '' },
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
    type: 'multiple_choice',
    question: '3. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 0.50, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 0.70, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 0.85, audioFileName: '' },
      { id: 4, text: 'Answer D', weight: 0.50, audioFileName: '' },
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
    type: 'multiple_choice',
    question: '4. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 0.50, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 0.70, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 0.85, audioFileName: '' },
      { id: 4, text: 'Answer D', weight: 0.50, audioFileName: '' },
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
    type: 'multiple_choice',
    question: '5. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 0.50, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 0.70, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 0.85, audioFileName: '' },
      { id: 4, text: 'Answer D', weight: 0.50, audioFileName: '' },
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
    type: 'multiple_choice',
    question: '6. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 0.50, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 0.70, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 0.85, audioFileName: '' },
      { id: 4, text: 'Answer D', weight: 0.50, audioFileName: '' },
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
