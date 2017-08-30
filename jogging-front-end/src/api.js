import Axios from 'axios'
import Auth from './auth'
export const API_ROOT = 'http://localhost:3001'

let axios = Axios.create({
  baseURL: API_ROOT
})

axios.interceptors.request.use(config => {
  if(Auth.getToken()){
    config.headers['Authorization'] = Auth.getToken()
  }
  return config
})

export const ADAPTER  = axios

class Api {
  constructor(adapter, apiRoot) {
    this.adapter = adapter
    this.root    = apiRoot
  }

  get(path, params={}) {
    return this.request("get", path, params)
  }

  post(path, params={}) {
    return this.request("post", path, params)
  }

  put(path, params={}) {
    return this.request("put", path, params)
  }

  delete(path, params={}) {
    return this.request("delete", path, params)
  }

  request(method, path, params={}){
    return this.adapter[method](path, params)
  }
}
export default (new Api(ADAPTER, API_ROOT))
