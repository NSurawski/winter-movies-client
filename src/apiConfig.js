let apiUrl
const apiUrls = {
  // replace with your deployed url - use local for dev?
  production: 'https://library-express-api.herokuapp.com',
  development: 'https://library-express-api.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
