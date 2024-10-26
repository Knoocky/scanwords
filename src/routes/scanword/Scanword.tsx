import { ChangeEvent, useEffect, useState } from 'react';
import { ScanwordData, ScanwordWord } from '../../types/ScanwordData';
import './scanword.css';
import { Cell } from './components/Cell/Cell';

interface ScanwordProps {
  scanwordData: ScanwordData;
}

export const Scanword: React.FC<ScanwordProps> = ({ scanwordData }) => {
  const [grid, setGrid] = useState(scanwordData.grid);
  const [highlightedCells, setHighlightedCells] = useState<Array<string>>([]);
  const [currentCell, setCurrentCell] = useState<string>('');
  const [currentWord, setCurrentWord] = useState<ScanwordWord | null>(null);

  const handleLetterChange = (row: number, col: number, letter: string) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[row][col].letter = letter; // Обновляем букву в нужной ячейке
      return newGrid;
    });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const [rowIndex, colIndex] = currentCell.split(' ').map(Number);

    if (!isNaN(rowIndex) && !isNaN(colIndex)) {
      const letter = event.key; // Получаем нажатую клавишу

      // Проверяем, является ли нажатая клавиша русской буквой
      const isRussianLetter = /^[А-Яа-яЁё]$/.test(letter);

      if (isRussianLetter) {
        handleLetterChange(rowIndex, colIndex, letter.toUpperCase()); // Приводим к верхнему регистру

        if (currentWord) {
          if (currentWord.direction === 'horizontal') {
            const nextColIndex = colIndex + 1; // Переходим вправо
            if (nextColIndex < scanwordData.grid[0].length) {
              setCurrentCell(`${rowIndex} ${nextColIndex}`);
            }
          } else if (currentWord.direction === 'vertical') {
            const nextRowIndex = rowIndex + 1; // Переходим вниз
            if (nextRowIndex < scanwordData.grid.length) {
              setCurrentCell(`${nextRowIndex} ${colIndex}`);
            }
          }
        }
      }

      // Обработка клавиш Backspace и Delete
      if (event.key === 'Backspace') {
        handleLetterChange(rowIndex, colIndex, ''); // Удаляем букву

        if (currentWord) {
          if (currentWord.direction === 'horizontal') {
            const nextColIndex = colIndex - 1; // Переходим влево

            if (nextColIndex < 0) {
              return;
            }

            // Проверяем, находится ли следующая клетка с вопросом
            const nextCellHasQuestion = grid[rowIndex][nextColIndex].questionId;

            if (nextColIndex >= 0 && !nextCellHasQuestion) {
              setCurrentCell(`${rowIndex} ${nextColIndex}`);
            }
          } else if (currentWord.direction === 'vertical') {
            const nextRowIndex = rowIndex - 1; // Переходим вверх
            // Проверяем, находится ли следующая клетка с вопросом

            if (nextRowIndex < 0) {
              return;
            }

            const nextCellHasQuestion = grid[nextRowIndex][colIndex].questionId;

            if (!nextCellHasQuestion) {
              setCurrentCell(`${nextRowIndex} ${colIndex}`);
            }
          }
        }
      }

      if (event.key === 'Delete') {
        handleLetterChange(rowIndex, colIndex, ''); // Удаляем букву
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown); // Добавляем обработчик события

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Убираем обработчик при размонтировании
    };
  }, [currentCell]); // Зависимости для эффекта

  return (
    <div className="scanword-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="scanword-row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex} ${colIndex}`}
              scanwordData={scanwordData}
              cell={cell}
              colIndex={colIndex}
              rowIndex={rowIndex}
              highlightedCells={highlightedCells}
              setHighlightedCells={setHighlightedCells}
              currentCell={currentCell}
              setCurrentCell={setCurrentCell}
              setCurrentWord={setCurrentWord}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
