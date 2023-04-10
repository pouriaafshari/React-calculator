import { useReducer } from "react"
import "./App.css"

const ACTIONS = 
{
  CHOOSE_OPERATION : "choose-operation",
  ADD_DIGIT : "add-digit",
  DEL_DIGIT : "del-digit",
  EVALUATE : "evaluate",
  CLEAR : "clear"

}

function reducer(state, {type, payload})
{  
  switch (type) 
  {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentNum === "0") 
      {
        return state
      }
      if (payload.digit === "." && state.currentNum.includes(".")) 
      {
        return state
      }
      return {...state, currentNum: `${state.currentNum || ""}${payload.digit}`}
  
    case ACTIONS.CLEAR:
      return {} 
    
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentNum == null)
      {
        return {...state, operation: payload.operation}
      }
      if (state.previousNum == null)
      {
        return {...state, previousNum: state.currentNum, currentNum: "", operation: payload.operation}
      }
      return {...state, previousNum: state.currentNum, currentNum: evaluate(state.currentNum, state.previousNum, payload.operation)}

    
    case ACTIONS.EVALUATE:
      return {...state, previousNum: state.currentNum, currentNum: evaluate(state.currentNum, state.previousNum, state.operation)}
    
    case ACTIONS.DEL_DIGIT:
      return {...state, currentNum: ""}

    default:
      break;
  }
}

function evaluate(currentNum, previousNum, operation)
{
  const A = parseFloat(currentNum)
  const B = parseFloat(previousNum)
  var ans = ""

  if (isNaN(A) || isNaN(B)) { return ans }

  switch(operation)
  {
    case "+":
      ans = A + B
      return ans.toString()
    
    case "-":
      ans = A - B
      return ans.toString()
    
    case "*":
      ans = A * B
      return ans.toString()

    case "/":
      ans = A / B
      return ans.toString()

    default:
      return ans
  }
}

function App()
{
  const [ {currentNum, previousNum, operation} , dispatch] = useReducer(reducer, {})

  return (
    <div className="calculator-grid">

      <div className="output">
        <div className="pre-operand"> {previousNum} {operation} </div>
        <div className="cur-operand"> {currentNum} </div>
      </div>

      <button className="span-two" onClick={() => {dispatch({ type: ACTIONS.CLEAR })} }>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DEL_DIGIT })}>DEL</button>

      <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "/" } })}> / </button>

      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "1" } })}> 1 </button>
      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "2" } })}> 2 </button>
      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "3" } })}> 3 </button>

      <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "*" } })}> * </button>

      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "4" } })}> 4 </button>
      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "5" } })}> 5 </button>
      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "6" } })}> 6 </button>

      <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "+" } })}> + </button>

      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "7" } })}> 7 </button>
      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "8" } })}> 8 </button>
      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "9" } })}> 9 </button>

      <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "-" } })}> - </button>

      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "." } })}> . </button>
      <button onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: { digit: "0" } })}> 0 </button>
      <button className="span-two" onClick={() => {dispatch({ type: ACTIONS.EVALUATE })}}>=</button>

    </div>
  );
}

export default App;
