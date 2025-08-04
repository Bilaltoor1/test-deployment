'use client';
import { useState } from 'react';

export default function Home() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }
    return secondOperand;
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);
    if (operator && firstOperand !== null) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-xs mx-auto">
        <div className="bg-gray-800 text-white text-4xl text-right rounded-t-lg p-4">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-px bg-gray-300 rounded-b-lg">
          <button onClick={clearDisplay} className="col-span-2 bg-gray-200 p-4 text-xl hover:bg-gray-300">AC</button>
          <button onClick={() => performOperation('/')} className="bg-orange-400 text-white p-4 text-xl hover:bg-orange-500">/</button>
          <button onClick={() => performOperation('*')} className="bg-orange-400 text-white p-4 text-xl hover:bg-orange-500">*</button>

          <button onClick={() => inputDigit(7)} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">7</button>
          <button onClick={() => inputDigit(8)} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">8</button>
          <button onClick={() => inputDigit(9)} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">9</button>
          <button onClick={() => performOperation('-')} className="bg-orange-400 text-white p-4 text-xl hover:bg-orange-500">-</button>

          <button onClick={() => inputDigit(4)} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">4</button>
          <button onClick={() => inputDigit(5)} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">5</button>
          <button onClick={() => inputDigit(6)} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">6</button>
          <button onClick={() => performOperation('+')} className="bg-orange-400 text-white p-4 text-xl hover:bg-orange-500">+</button>

          <button onClick={() => inputDigit(1)} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">1</button>
          <button onClick={() => inputDigit(2)} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">2</button>
          <button onClick={() => inputDigit(3)} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">3</button>
          <button onClick={handleEquals} className="row-span-2 bg-orange-400 text-white p-4 text-xl hover:bg-orange-500">=</button>

          <button onClick={() => inputDigit(0)} className="col-span-2 bg-gray-200 p-4 text-xl hover:bg-gray-300">0</button>
          <button onClick={inputDecimal} className="bg-gray-200 p-4 text-xl hover:bg-gray-300">.</button>
        </div>
      </div>
    </div>
  );
}
