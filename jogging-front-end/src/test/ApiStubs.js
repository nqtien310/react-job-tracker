import {Api} from '../api'

function stubApiError(type, response){
  let error = { "response": { "data": response } }

  Api.prototype[type] = (path, params) => {
    return (new Promise((resolve, reject) => {
      reject(error)
    }))
  }
}

function stubApiSuccess(type, response){
  response = {  "data": response }

  Api.prototype[type] = (path, params) => {
    return (new Promise((resolve, reject) => {
      resolve(response)
    }))
  }
}

export {
  stubApiError,
  stubApiSuccess
}
