import { Store } from '@tanstack/store'

export interface TLoginRequest {
  email: string
  password: string
}

export interface TUser {
  user: {
    userId: string
    role: string
  }
  tokens: {
    access_token: string
    refresh_token: string
  }
  isAuthenticated: boolean
}


const initialState = {
  isAuthenticated: false,
  user: {
    userId: '',
    role: '',
  },
  tokens: {
    access_token: '',
    refresh_token: '',
  },
}

export const authStore = new Store<TUser>(initialState)

export const loadData = () => {
  const storedData = localStorage.getItem('authData')
  let jsonData
  if (storedData) {
    jsonData = JSON.parse(storedData)
  }
  return jsonData
}

export const authSlice = {
  login: (userData: TUser) => {
    authStore.setState({
      isAuthenticated: true,
      user: userData.user,
      tokens: userData.tokens,
    })
    localStorage.setItem('authData', JSON.stringify(userData))
  },

  logout: () => {
    authStore.setState(initialState)
    localStorage.removeItem('authData')
  },

  initializeUser: () => {
    const userData = localStorage.getItem('authData')
    if (userData) {
      const jsonData = JSON.parse(userData)
      authStore.setState(jsonData)
    }
  },
}
