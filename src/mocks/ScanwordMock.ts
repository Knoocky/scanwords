import { ScanwordData } from '../types/ScanwordData';

export const scanwordData: ScanwordData = {
  words: [
    {
      id: '1',
      question: 'Цвет',
      answer: 'Красный',
      answerStart: { row: 0, col: 1 }, // Начало ответа (направление: горизонтальное)
      direction: 'horizontal'
    },
    {
      id: '2',
      question: 'Животное',
      answer: 'Слон',
      answerStart: { row: 0, col: 5 }, // Начало ответа (направление: вертикальное)
      direction: 'vertical'
    },
    {
      id: '3',
      question: 'Растение',
      answer: 'Трава',
      answerStart: { row: 2, col: 1 }, // Начало ответа (направление: горизонтальное)
      direction: 'horizontal'
    },
    {
      id: '4',
      question: 'Скорость',
      answer: 'Быстрая',
      answerStart: { row: 1, col: 5 }, // Начало ответа (направление: вертикальное)
      direction: 'vertical'
    },
    {
      id: '5',
      question: 'Напиток',
      answer: 'Кофе',
      answerStart: { row: 4, col: 1 }, // Начало ответа (направление: горизонтальное)
      direction: 'horizontal'
    }
  ],
  grid: [
    [
      { questionId: '1' },
      { letter: '' },
      { letter: '' },
      { letter: '' },
      { letter: '' },
      { letter: '' }
    ],
    [
      { letter: ' ' },
      { letter: ' ' },
      { letter: ' ' },
      { letter: ' ' },
      { letter: ' ' },
      { letter: '' }
    ],
    [
      { questionId: '3' },
      { letter: '' },
      { letter: '' },
      { letter: '' },
      { letter: '' },
      { letter: '' }
    ],
    [
      { letter: ' ' },
      { questionId: '5' },
      { letter: ' ' },
      { letter: ' ' },
      { letter: ' ' },
      { letter: ' ' }
    ],
    [
      { letter: ' ' },
      { letter: '' },
      { letter: '' },
      { letter: '' },
      { letter: '' },
      { letter: ' ' }
    ],
    [
      { letter: ' ' },
      { letter: ' ' },
      { letter: ' ' },
      { letter: ' ' },
      { letter: ' ' },
      { letter: ' ' }
    ]
  ]
};
