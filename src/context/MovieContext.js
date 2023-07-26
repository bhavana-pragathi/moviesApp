import React from 'react'

const MovieContext = React.createContext({
  username: '',
  password: '',
  changeUsername: () => {},
  changePassword: () => {},
})

export default MovieContext
