export const TOKEN_KEY = 'JOGAPPTOKEN'
const Auth = {
  setToken: (token) => {
    return localStorage.setItem(TOKEN_KEY, token)
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY)
  },

  clearToken: () => {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export default Auth
