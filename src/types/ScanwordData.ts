// Тип для ячейки сетки
export interface GridCell {
  letter?: string; // Буква в ячейке
  questionId?: string; // ID вопроса, если ячейка содержит вопрос
}

// Тип для вопроса
export interface ScanwordWord {
  id: string; // Уникальный идентификатор вопроса
  question: string; // Текст вопроса
  answer: string; // Правильный ответ
  answerStart: {
    // Начальная позиция ответа в сетке
    row: number;
    col: number;
  };
  direction: 'horizontal' | 'vertical'; // Направление ответа
}

// Тип для данных сканворда
export interface ScanwordData {
  words: ScanwordWord[]; // Массив вопросов
  grid: GridCell[][]; // Двумерный массив ячеек сетки
}
