export const initialState = false

export const reducer = (state, action)=>{
  if(action.type === "authorization"){
    return action.payload
  }
  return state
}