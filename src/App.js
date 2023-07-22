import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import MovieItemDetails from './components/MovieItemDetails'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="" component={Home} />
    <Route exact path="/popular" component={Popular} />
    <Route exact path="/movies/:id" component={MovieItemDetails} />
    <Route exact path="/search" component={Search} />
    <Route exact path="/account" component={Account} />
    <Route component={NotFound} />
  </Switch>
)

export default App
