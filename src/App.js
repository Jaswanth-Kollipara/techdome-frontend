import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import AdminLogin from './components/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import SignUp from './components/SignUp'
import Home from './components/Home'
import NewLoan from './components/NewLoan'
import AdminHome from './components/AdminHome'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/adminlogin" component={AdminLogin} />
    <Route exact path="/signup" component={SignUp} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/newloan" component={NewLoan} />
    <ProtectedRoute exact path="/adminhome" component={AdminHome} />
    <Redirect component={NotFound} />
  </Switch>
)

export default App