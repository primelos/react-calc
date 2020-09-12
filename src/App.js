import React, { useState } from "react";
import "./App.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ["/", "*", "-", "+"];
const ids = {
  7: "seven",
  8: "eight",
  9: "nine",
  4: "four",
  5: "five",
  6: "six",
  1: "one",
  2: "two",
  3: "three",
  0: "zero",
  "/": "divide",
  "*": "multiply",
  "-": "subtract",
  "+": "add"
};

function App() {
  // const [press, setPress] = useState(undefined)
  // const [current, setCurrent] = useState("0");
  const [calcu, setCalcu] = useState("0");
  const [operation, setOperation] = useState(undefined);
  const [lastPressed, setLastPressed] = useState(undefined);

  const handleClick = (e) => {
    const { innerText } = e.target;

    switch (innerText) {
      case "AC":
        // setCurrent("0");
        setCalcu("0");
        break;
      case "=":
        const evaluated = eval(calcu);
        // setCurrent(evaluated)
        setCalcu(evaluated);
        break;
      case ".":
        const splitted = calcu.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];
        if (!last.includes(".")) {
          setCalcu(calcu + ".");
        }
        break;
      default:
        let e = undefined;
        if (ops.includes(innerText)) {
          if (ops.includes(lastPressed) && innerText !== "-") {
            const lastNumberIdx = calcu.split('').reverse()
              .findIndex(char => char !== ' ' && nums.includes(+char))
            e = calcu.slice(0, calcu.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${calcu} ${innerText} `;
            // console.log(calcu.slice(0))
            // console.log('e',e)
          }
        } else {
          e = calcu === "0" ? innerText : calcu + innerText;
        }

        setCalcu(e);
    }
    setLastPressed(innerText);

    // const { innerText } = e.target;
    // setLastPressed(innerText)

    // // if (lastPressed)
    // if (!Number.isNaN(Number(innerText))) {
    //   if (current === "0") {
    //     setCurrent(innerText);
    //   } else if (ops.includes(lastPressed)) {
    //       setCurrent(innerText)
    //   } else {
    //     setCurrent(current + innerText);

    //   }
    //   return;
    // }

    // switch (innerText) {
    //   case "AC":
    //     setCurrent("0");
    //     setCalcu(undefined);
    //     setOperation(undefined);
    //     break;
    //   case ".":
    //     if (!current.includes(".")) {
    //       setCurrent(current + innerText);
    //     }
    //     break;
    //   default:
    //     if (!operation) {
    //       setOperation(innerText);
    //       setCalcu(current);
    //       setCurrent("");
    //     } else if (innerText === "=") {
    //       const evalued = eval(`${calcu} ${operation} ${current}`);
    //       setOperation(undefined);
    //       setCalcu(evalued);
    //       setCurrent(evalued);
    //     } else {
    //       const evalued = eval(`${calcu} ${operation} ${current}`);
    //       setOperation(innerText)
    //       setCalcu(evalued)
    //       setCurrent(evalued)
    //     }
    // }
  };
  return (
    <div className="calculator">
      {/* <p style={{position: 'absolute', top: 0}}>{JSON.stringify(setCurrent,null,2)}</p> */}
      <div id="display" className="display">
        <small>{calcu}</small>
        {calcu}
      </div>
      <div className="nums-container">
        <button
          className="big-h light-grey ac"
          onClick={handleClick}
          id="clear"
        >
          AC
        </button>
        {nums.map((num) => (
          <button
            className={`dark-grey ${num === 0 && "big-h"}`}
            key={num}
            onClick={handleClick}
            id={ids[num]}
          >
            {num}
          </button>
        ))}
        <button className="light-grey" onClick={handleClick} id="decimal">
          .
        </button>
      </div>
      <div className="ops-container">
        {ops.map((op) => (
          <button
            className="orange"
            key={op}
            onClick={handleClick}
            id={ids[op]}
          >
            {op}
          </button>
        ))}
        <button className="orange" onClick={handleClick} id="equals">
          =
        </button>
      </div>
    </div>
  );
}

export default App;
