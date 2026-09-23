import { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNextValue, setWaitingForNextValue] = useState(false);

  const performCalculation = (first, second, operation) => {
    switch (operation) {
      case "+":
        return first + second;
      case "-":
        return first - second;
      case "*":
        return first * second;
      case "/":
        return second === 0 ? "Error" : first / second;
      default:
        return second;
    }
  };

  const handleNumber = (digit) => {
    if (waitingForNextValue) {
      setDisplay(String(digit));
      setWaitingForNextValue(false);
      return;
    }

    setDisplay((prev) =>
      prev === "0" ? String(digit) : prev + digit
    );
  };

  const handleDecimal = () => {
    if (waitingForNextValue) {
      setDisplay("0.");
      setWaitingForNextValue(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = Number(display);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator && !waitingForNextValue) {
      const result = performCalculation(
        storedValue,
        inputValue,
        operator
      );

      setDisplay(String(result));
      setStoredValue(result);
    }

    setOperator(nextOperator);
    setWaitingForNextValue(true);
  };

  const displayText =
    operator && storedValue !== null
      ? waitingForNextValue
        ? `${storedValue} ${operator}`
        : `${storedValue} ${operator} ${display}`
      : display;

  const handleEqual = () => {
    if (operator && storedValue !== null) {
      const currentValue = Number(display);

      const result = performCalculation(
        storedValue,
        currentValue,
        operator
      );

      setDisplay(String(result));
      setStoredValue(null);
      setOperator(null);
      setWaitingForNextValue(false);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForNextValue(false);
  };

  const handleBackspace = () => {
    if (waitingForNextValue) {
      setDisplay(String(storedValue ?? 0));
      setWaitingForNextValue(false);
      return;
    }

    setDisplay((prev) => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const buttons = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: linear-gradient(
            135deg,
            #f9faff,
            #fefdff
          );
          min-height: 100vh;
        }

        .calculator-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 15px;
        }

        .calculator-shell h2 {
          color: white;
          font-size: 32px;
          margin-bottom: 20px;
          text-align: center;
          text-shadow: 0 3px 10px rgba(0, 0, 0, 0.25);
        }

        .calculator {
          width: 340px;
          padding: 20px;
          border-radius: 22px;
          background: #1e293b;
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.35),
            inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }

        /* Display */

        .display {
          width: 100%;
          min-height: 85px;
          padding: 20px 15px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          background: #0f172a;
          color: #ffffff;

          border-radius: 14px;
          border: 2px solid #334155;

          font-size: 30px;
          font-weight: bold;

          overflow: hidden;
          white-space: nowrap;

          box-shadow:
            inset 0 3px 10px rgba(0, 0, 0, 0.4);
        }

        /* Button Row */

        .button-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 10px;
        }

        /* General Buttons */

        button {
          height: 62px;
          border: none;
          border-radius: 12px;
          font-size: 21px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        button:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }

        button:active {
          transform: scale(0.94);
        }

        /* Number Buttons */

        .number {
          background: #334155;
          color: white;
          box-shadow: 0 4px 0 #1e293b;
        }

        .number:hover {
          background: #475569;
        }

        /* Operator Buttons */

        .operator {
          background: #f59e0b;
          color: white;
          box-shadow: 0 4px 0 #b45309;
        }

        .operator:hover {
          background: #fbbf24;
        }

        /* Equal */

        .equals {
          background: #22c55e;
          color: white;
          box-shadow: 0 4px 0 #15803d;
        }

        .equals:hover {
          background: #4ade80;
        }

        /* Clear and Backspace */

        .clear {
          grid-column: span 2;
          background: #ef4444;
          color: white;
          box-shadow: 0 4px 0 #b91c1c;
        }

        .backspace {
          grid-column: span 2;
          background: #64748b;
          color: white;
          box-shadow: 0 4px 0 #475569;
        }

        .clear:hover {
          background: #f87171;
        }

        .backspace:hover {
          background: #94a3b8;
        }

        /* Mobile */

        @media (max-width: 480px) {
          .calculator-shell {
            padding: 20px 10px;
          }

          .calculator-shell h2 {
            font-size: 26px;
          }

          .calculator {
            width: 100%;
            max-width: 340px;
            padding: 16px;
          }

          .display {
            min-height: 75px;
            font-size: 25px;
          }

          button {
            height: 58px;
            font-size: 19px;
          }
        }
      `}</style>

      <div className="calculator-shell">
        <h2>Simple Calculator</h2>

        <div className="calculator">

          <div className="display">
            {displayText}
          </div>

          <div className="button-row">
            <button
              className="clear"
              onClick={handleClear}
            >
              C
            </button>

            <button
              className="backspace"
              onClick={handleBackspace}
            >
              ⌫
            </button>
          </div>

          {buttons.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="button-row"
            >
              {row.map((button) => {

                if (button === "=") {
                  return (
                    <button
                      key={button}
                      className="operator equals"
                      onClick={handleEqual}
                    >
                      =
                    </button>
                  );
                }

                if (
                  ["+", "-", "*", "/"].includes(button)
                ) {
                  return (
                    <button
                      key={button}
                      className="operator"
                      onClick={() =>
                        handleOperator(button)
                      }
                    >
                      {button}
                    </button>
                  );
                }

                if (button === ".") {
                  return (
                    <button
                      key={button}
                      className="number"
                      onClick={handleDecimal}
                    >
                      .
                    </button>
                  );
                }

                return (
                  <button
                    key={button}
                    className="number"
                    onClick={() =>
                      handleNumber(button)
                    }
                  >
                    {button}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Calculator;