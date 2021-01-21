// import React since our JSX is converted to React.createElement calls
import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
// v4 is a property inside uuid package like Component for react
// from the 'uuid' package (universal unique id)
// import the 4th version of 'uuid', and call it 'uuid' (as uuid)
import { v4 as uuid } from 'uuid'

// imports for different components
// since our components are in folders with the same name, the folder nsme AND the component name end up in the same path
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// class component
// has a constructor to initialize state for our App
// BEST PRACTICE: Accepts props and calls super with props so that this.props is set in the constructor
// using hooks would mean alot of rewriting code cause we use class and constructor
class App extends Component {
  constructor (props) {
    super(props)

    // initially we wont have a user until they have been signed in
    // starts as null
    // Also, we want to keep track if any message alerts we show the user. Initially this will be empty
    //
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  // set the user state to the passed in user
  setUser = user => this.setState({ user })

  // Reset the user back to null (signing out our user)
  clearUser = () => this.setState({ user: null })

  // the deleteAlert function removes the msgAlert with the given id
  deleteAlert = (id) => {
    // update the msgAlerts state
    this.setState((state) => {
      // set the msgAlerts state to be all of the msgAlerts currently in State
      // but without any msgAlert whos id matches the id matches the id we passed in a parameter (filter msgAlerts)
      // we filter for any message whos id is not the id we are trying to delete
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  // msgAlert will show a new message alert
  // accepts a heading for the alert, the alert's body (message), and the bootstrap variant
  // to style the alert (primary, secondary, danger etc.)
  msgAlert = ({ heading, message, variant }) => {
    // create a unique id for this message
    const id = uuid()
    // Update msgAlerts state
    this.setState((state) => {
      // set the msGAlerts state to be a new array
      // with all of the msgAlerts from the current state (...state)
      // ... syntax adds the items in the curly braces to the asrray stated, you can specify where
      // you want to add them in the array by just moving the ... statement
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state
    // de-structure the msgAlerts and user state
    return (
      <Fragment>
        {/* this header is the top navigation with our links */}
        <Header user={user} />
        {/* Take each message alert and map it into an AutoDismissAlert */}
        {msgAlerts.map(msgAlert => (
          // An AutoDismissAlert shows a message (alert) and then automatically disappears
          <AutoDismissAlert
            // React uses the key to idenify the element when it is inserted, updateds or removed
            key={msgAlert.id}

            // the msgAlert needs the heading, variant and message to show for the alert
            heading={msgAlert.heading}
            // success or failure
            variant={msgAlert.variant}
            // message to be displayed
            message={msgAlert.message}

            // the msgAlert needs the msgAlerts ID and deleteAlert function to remove the msgAlert after 5 sec
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          {/* Use a normal Route component so we can SignUp whenever we aren't signed in */}
          <Route path='/sign-up' render={() => (
            // Pass the SignUp component the message alert so it can tell us if we signed up
            // successfully or not
            // We also pass the setUser function so we can be automatically signed in
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          {/* an authenticatedRoute is used the same way as a normal route EXCEPT it has a user prop we must pass setInterval(function ()
           The AuthenticatedRoute will show if the user is not null, it will redirect to the home page */}
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
