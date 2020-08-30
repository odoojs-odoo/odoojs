// import Cookies from 'js-cookie'

// 2019-11-16 By Master Zhang
// Cookies replaced by localStorage for google browser
//

const TokenKey = 'Admin-Token'

export function getToken() {
  // const res = Cookies.get(TokenKey)
  const res = localStorage.getItem(TokenKey)
  return res
}

export function setToken(token) {
  // res = Admin-Token=admin-token; path=/
  // const res = Cookies.set(TokenKey, token)
  const res = localStorage.setItem(TokenKey, token)
  return res
}

export function removeToken() {
  // const res = Cookies.remove(TokenKey)
  const res = localStorage.clear(TokenKey)
  return res
}
