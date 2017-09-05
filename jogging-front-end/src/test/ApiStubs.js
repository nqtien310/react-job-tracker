import {Api} from '../api'

function stubApiError(type, response){
  let error = { "response": { "data": response } }

  Api.prototype.post = (path, params) => {
    return (new Promise((resolve, reject) => {
      reject(error)
    }))
  }
}

export {
  stubApiError
}
