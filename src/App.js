import React from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
 import {Create} from "./components/create/Create"

 import Contacts from './components/contact/Contact';
 import Subscribe from './components/Subscribe/subscribe.jsx';


 
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} /> 
          <Route exact path='/details/:id' component={DetailsPages} />
          <Route exact path='/contact' component={Contacts} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/about' component={Subscribe} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}
export default App
