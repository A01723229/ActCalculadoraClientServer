"use client";
import { useState } from "react";

export default function Calculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = async () => {
    setError("");

    const number1 = parseInt(num1);
    const number2 = parseInt(num2);

    if (isNaN(number1) || isNaN(number2)) {
      setError("Please enter valid numbers.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num1: number1, num2: number2, operation }),
        mode: "cors",
      });

      if (!response.ok) {
        throw new Error("Failed to calculate. Check backend.");
      }

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error calculating:", error);
      setError("Error connecting to server.");
    }
  };

  return (
    <div className="container flex flex-col items-center gap-4 p-4">
      <div className="input-container flex gap-2">
        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Enter number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <select
          className="p-2 border rounded bg-white text-black"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="+">+</option>
          <option value="-">-</option>
          <option value="*">*</option>
          <option value="/">/</option>
        </select>
        <input
          className="p-2 border rounded"
          type="number"
          placeholder="Enter number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>
      <button
        onClick={handleCalculate}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Calculate
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {result !== null && <div className="text-lg font-bold">Result: {result}</div>}
    </div>
  );
}
