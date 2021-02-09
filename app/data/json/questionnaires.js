export default [
  {
    order: 2,
    code: 'question_2',
    question: '2. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 1, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 2, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 3, audioFileName: '' }
    ],
    skip_logic: {
      operator: 'or',
      criterias: [
        {
          code: 'question_1',
          operator: 'gt',
          value: 2
        },
        {
          code: 'question_1',
          operator: 'eq',
          value: 3
        },
      ]
    }
  },
  {
    order: 1,
    code: 'question_1',
    question: '1. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 1, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 2, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 3, audioFileName: '' }
    ],
    skip_logic: null
  },
  {
    order: 3,
    code: 'question_3',
    question: '3. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 1, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 2, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 3, audioFileName: '' }
    ],
    skip_logic: {
      operator: 'and',
      criterias: [
        {
          code: 'question_1',
          operator: 'gt',
          value: 2
        },
        {
          code: 'question_2',
          operator: 'eq',
          value: 2
        },
      ]
    }
  },
  {
    order: 5,
    code: 'question_5',
    question: '5. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 1, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 2, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 3, audioFileName: '' }
    ],
    skip_logic: {
      operator: 'and',
      criterias: [
        {
          code: 'question_1',
          operator: 'eq',
          value: 2
        },
        {
          code: 'question_2',
          operator: 'eq',
          value: 2
        },
      ]
    }
  },
  {
    order: 4,
    code: 'question_4',
    question: '4. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 1, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 2, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 3, audioFileName: '' }
    ],
    skip_logic: {
      operator: 'and',
      criterias: [
        {
          code: 'question_1',
          operator: 'gt',
          value: 2
        },
        {
          code: 'question_3',
          operator: 'eq',
          value: 2
        },
      ]
    }
  },
  {
    order: 6,
    code: 'question_6',
    question: '6. What is your purpose there?',
    audioFileName: '',
    options: [
      { id: 1, text: 'Answer A', weight: 1, audioFileName: '' },
      { id: 2, text: 'Answer B', weight: 2, audioFileName: '' },
      { id: 3, text: 'Answer C', weight: 3, audioFileName: '' }
    ],
    skip_logic: {
      operator: 'and',
      criterias: [
        {
          code: 'question_1',
          operator: 'eq',
          value: 2
        },
        {
          code: 'question_5',
          operator: 'eq',
          value: 2
        },
      ]
    }
  },
]
