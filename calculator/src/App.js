import HighlightButton from "./HighlightButton"
import { useReducer } from "react"
import "./App.css"

export const ACTIONS = 
{
  CHOOSE_OPERATION : "choose-operation",
  ADD_DIGIT : "add-digit",
  DEL_DIGIT : "del-digit",
  EVALUATE : "evaluate",
  CLEAR : "clear"

}

function reducer(state, {type, payload})
{  
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentNum: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentNum === "0") {
        return state
      }
      if (payload.digit === "." && state.currentNum.includes(".")) {
        return state
      }

      return {
        ...state,
        currentNum: `${state.currentNum || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentNum == null && state.previousNum == null) {
        return state
      }

      if (state.currentNum == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }

      if (state.previousNum == null) {
        return {
          ...state,
          operation: payload.operation,
          previousNum: state.currentNum,
          currentNum: null,
        }
      }

      return {
        ...state,
        previousNum: evaluate(state),
        operation: payload.operation,
        currentNum: null,
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.DEL_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentNum: null,
        }
      }
      if (state.currentNum == null) return state
      if (state.currentNum.length === 1) {
        return { ...state, currentNum: null }
      }

      return {
        ...state,
        currentNum: state.currentNum.slice(0, -1),
      }
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentNum == null ||
        state.previousNum == null
      ) {
        return state
      }

      return {
        ...state,
        currentNum: evaluate(state.currentNum, state.previousNum, state.operation),
      }
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

      <HighlightButton digit="1" dispatch={dispatch}/>
      <HighlightButton digit="2" dispatch={dispatch}/>
      <HighlightButton digit="3" dispatch={dispatch}/>

      <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "*" } })}> * </button>

      <HighlightButton digit="4" dispatch={dispatch}/>
      <HighlightButton digit="5" dispatch={dispatch}/>
      <HighlightButton digit="6" dispatch={dispatch}/>

      <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "+" } })}> + </button>

      <HighlightButton digit="7" dispatch={dispatch}/>
      <HighlightButton digit="8" dispatch={dispatch}/>
      <HighlightButton digit="9" dispatch={dispatch}/>

      <button onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: { operation: "-" } })}> - </button>

      <HighlightButton digit="." dispatch={dispatch}/>
      <HighlightButton digit="0" dispatch={dispatch}/>
      <button className="span-two" onClick={() => {dispatch({ type: ACTIONS.EVALUATE })}}>=</button>

    </div>
  );
}

export default App;
