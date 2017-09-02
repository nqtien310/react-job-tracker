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
  },

  isLogin: () => {
    return !!localStorage.getItem(TOKEN_KEY)
  },

  setRole: (role) => {
    localStorage.setItem('ROLE', role)
  },

  getRole: (role) => {
    return localStorage.getItem('ROLE')
  },

  clearRole: () => {
    localStorage.removeItem("ROLE")
  }
}

export default Auth
