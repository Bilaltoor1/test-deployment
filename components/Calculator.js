"use client";
import { useState } from 'react';

export default function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (value) => {
    setInput(input + value);
  };

  const calculateResult = () => {
    try {
      setResult(eval(input));
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="bg-gray-900 text-white p-2 rounded-md mb-4">
        <div className="text-right text-2xl">{result || input || '0'}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <button onClick={() => handleInput('7')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">7</button>
        <button onClick={() => handleInput('8')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">8</button>
        <button onClick={() => handleInput('9')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">9</button>
        <button onClick={() => handleInput('/')} className="bg-orange-500 hover:bg-orange-400 text-white p-4 rounded-md">/</button>
        <button onClick={() => handleInput('4')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">4</button>
        <button onClick={() => handleInput('5')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">5</button>
        <button onClick={() => handleInput('6')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">6</button>
        <button onClick={() => handleInput('*')} className="bg-orange-500 hover:bg-orange-400 text-white p-4 rounded-md">*</button>
        <button onClick={() => handleInput('1')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">1</button>
        <button onClick={() => handleInput('2')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">2</button>
        <button onClick={() => handleInput('3')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">3</button>
        <button onClick={() => handleInput('-')} className="bg-orange-500 hover:bg-orange-400 text-white p-4 rounded-md">-</button>
        <button onClick={() => handleInput('0')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">0</button>
        <button onClick={() => handleInput('.')} className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-md">.</button>
        <button onClick={calculateResult} className="bg-green-500 hover:bg-green-400 text-white p-4 rounded-md">=</button>
        <button onClick={() => handleInput('+')} className="bg-orange-500 hover:bg-orange-400 text-white p-4 rounded-md">+</button>
        <button onClick={clearInput} className="col-span-4 bg-red-500 hover:bg-red-400 text-white p-4 rounded-md">Clear</button>
      </div>
    </div>
  );
}
