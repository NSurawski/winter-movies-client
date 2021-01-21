import React, { Component } from 'react'
// import with Router so we have access to the route props (match, history, location)
import { withRouter } from 'react-router-dom'

// import our sign up and sign in functions that make our http requests
import { signUp, signIn } from '../../api/auth'
// import the pre-defined messages we have for our alerts (from message.js)
import messages from '../AutoDismissAlert/messages'

// import a form and a button from React-bootstrap
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor (props) {
    super(props)

    // keep track of the email, password and password confirmation in state
    // we'll use these in our axios http request to sign up
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  // update the state when an input changes
  handleChange = event => {
    // event.target is the form control that caused the change event
    // set the state with the key of `name` to the form.Control's new value
    this.setState({
      // create a new object - name refers to Form.Control below and update with new info - line 89
      [event.target.name]: event.target.value
    })
  }
  // make a sign up request when form is submitted
  onSignUp = event => {
    // don't refresh the page
    event.preventDefault()

    // extract the props.msgAlert and setUser
    const { msgAlert, history, setUser } = this.props

    // MAKE A signUp axios request. Pass this.state so it has access to
    signUp(this.state)
      //
      .then(() => signIn(this.state))
      // set the user state in App.js to the user we got from signing in
      .then(res => setUser(res.data.user))
      // call msgAlert to tell the user that they were able to sign up successfully
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        // the success variant makes the pop up green (success)
        variant: 'success'
      }))
      // history.push will send you to the home page - this is similar to a redirect
      .then(() => history.push('/'))
      // if an error occurs
      .catch(error => {
        // , we want to reset the state to its initial values, clears form!
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        // send an error message alert
        msgAlert({
          // error.message is the specific message from the error object
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          // the failure varient will be danger red (bootstrap success/failure/primary colors)
          variant: 'danger'
        })
      })
  }

  render () {
    // destructure (extracting) the email, pw and pw confirmation state
    const { email, password, passwordConfirmation } = this.state

    return (
      // Add a row to use the bootstrap grid (this is inside a container in App.js)
      <div className="row">
        {/* On a small screen, take up 10/12 columns, On medium and largwr screens, take up
          8/12 columns mt-5 adding more spacing at the top of this div, 5 adds a decent amt of margin.
           mx-auto deals with left and right and sets margin to 'auto' - read more on bootstap docs */}
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          {/* Add a bootstrap form, similar to a normal form but prettier
             */}
          <Form onSubmit={this.onSignUp}>
            {/* A form.Group grabs a Form.Control (input), label, and optional help text */}
            {/* The controlId is used for accessability and should match the Form.Control */}
            <Form.Group controlId="email">
              {/* A label for our Form.Control, similar to a <label> element */}
              <Form.Label>Email address</Form.Label>
              {/* Form.Control is how you create a form in React-Bootstrap - like another term for input
                Like an HTML input, but this is the bootstrap term for one, and its prettier! */}
              <Form.Control
              // required input, similar to an inputs required attribute we used on last project
                required
                type="email"
                // The name determines what state will be updated by this.handleChange
                name="email"
                // the value is the current value of the input (our current email state)
                value={email}
                placeholder="Enter email"
                // what function to call when this.Form.Control (input) changes
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                // similar to email, but we change the type, name and placeholder text
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            {/* Add a button to submit our form, give it the primary color declare on .scss */}
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

// wrtap signUp with router, so we have access to the history prop
export default withRouter(SignUp)
