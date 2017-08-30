export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

export default function SetErrorMessage(error){
  let message = null;
  if(error){
    message = error.response.data.message
  }

  return {
    type: SET_ERROR_MESSAGE,
    payload: message
  }
}
