import { useEffect, useState } from 'react';
import { GridCell, ScanwordData, ScanwordWord } from '../../../../types/ScanwordData';
import './cell.css';

interface CellProps {
  scanwordData: ScanwordData;
  cell: GridCell;
  colIndex: number;
  rowIndex: number;
  highlightedCells: string[];
  setHighlightedCells: React.Dispatch<React.SetStateAction<string[]>>;
  currentCell: string;
  setCurrentCell: React.Dispatch<React.SetStateAction<string>>;
  setCurrentWord: React.Dispatch<React.SetStateAction<ScanwordWord | null>>;
}

export const Cell: React.FC<CellProps> = ({
  scanwordData,
  cell,
  colIndex,
  rowIndex,
  highlightedCells,
  setHighlightedCells,
  currentCell,
  setCurrentCell,
  setCurrentWord
}) => {
  const findAndHighlightAnswerCells = (currentWord: ScanwordWord) => {
    const answerLength = currentWord.answer.length;
    const answerCells: string[] = [];

    if (currentWord.direction === 'horizontal') {
      for (let i = 0; i < answerLength; i++) {
        answerCells.push(`${currentWord.answerStart.row} ${currentWord.answerStart.col + i}`);
      }
    } else {
      for (let i = 0; i < answerLength; i++) {
        answerCells.push(`${currentWord.answerStart.row + i} ${currentWord.answerStart.col}`);
      }
    }

    setHighlightedCells(answerCells);
  };

  const findCurrentWord = () => {
    return scanwordData.words.find(
      (word) =>
        (word.direction === 'horizontal' &&
          word.answerStart.row === rowIndex &&
          word.answerStart.col <= colIndex &&
          word.answerStart.col + word.answer.length - 1 >= colIndex) ||
        (word.direction === 'vertical' &&
          word.answerStart.col === colIndex &&
          word.answerStart.row <= rowIndex &&
          word.answerStart.row + word.answer.length - 1 >= rowIndex)
    );
  };

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    setCurrentCell(`${rowIndex} ${colIndex}`);

    // Проходим по всем вопросам, чтобы проверить, есть ли вопрос в этой ячейке
    const currentWord = findCurrentWord();

    setCurrentWord(currentWord || null);

    if (currentWord) {
      findAndHighlightAnswerCells(currentWord);
    }
  };

  const handleQuestionClick = (wordId: string) => {
    const currentWord = scanwordData.words.find((word) => word.id === wordId);

    if (currentWord) {
      findAndHighlightAnswerCells(currentWord);
    }
  };

  const isHighlightedCell = (rowIndex: number, colIndex: number) => {
    return highlightedCells.includes(`${rowIndex} ${colIndex}`);
  };

  const isCurrentCell = (rowIndex: number, colIndex: number) => {
    return currentCell == `${rowIndex} ${colIndex}`;
  };

  return (
    <div
      className={`scanword-cell ${isHighlightedCell(rowIndex, colIndex) ? 'highlight' : ''}`}
      onClick={() => handleCellClick(rowIndex, colIndex)}>
      {/* Отображение вопроса, если ячейка содержит вопрос */}
      {cell.questionId ? (
        <span
          className="question-mark"
          onClick={(e) => {
            e.stopPropagation(); // Остановка всплытия, чтобы не вызывался handleCellClick
            handleQuestionClick(cell.questionId!);
          }} // Добавление обработчика клика
        >
          {scanwordData.words.find((word) => word.id === cell.questionId)?.question}
        </span>
      ) : (
        <div className={`letter-cell ${isCurrentCell(rowIndex, colIndex) ? 'current-cell' : ''}`}>
          {cell.letter} {/* Отображение буквы, если она есть */}
        </div>
      )}
    </div>
  );
};
