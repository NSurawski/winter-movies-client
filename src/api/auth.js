// import our apiUrl (similar to the browser template)
import apiUrl from '../apiConfig'
// import axios so we can make http requests
import axios from 'axios'

// the signUp function accepts the credentials (email, password and password confirmation)
// we use named exports to export each function individually instead of default export
export const signUp = credentials => {
  // it makes an axios request and returns the promise so we can use .then on it
  return axios({
    // method and url are the same from the jquery ajax token auth lesson
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        // since credentials is the same as this.state, credentials.email is like this.state.email
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
