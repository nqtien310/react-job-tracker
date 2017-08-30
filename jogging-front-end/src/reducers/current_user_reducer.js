export default function CurrentUserReducer(state=null, action){
  switch(action.type){
    case 'AUTHENTICATED': {
      return action.payload.data
    }
    default: {
      return state
    }
  }
}
