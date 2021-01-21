// import React
import React from 'react'
// import the React Bootstrap Alert
import Alert from 'react-bootstrap/Alert'

// import the stylesheet for this component
import './AutoDismissAlert.scss'

class AutoDismissAlert extends React.Component {
  // adds a constructor to initialize state and keep track of the timeoutId
  constructor (props) {
    super(props)
    // by default, we want to show the AutoDismissAlert
    this.state = {
      show: true
    }
    // the timeoutId is used to cancell our setTimeout call
    this.timeoutId = null
  }

  // this function will happen after our component is mounted (first shown on screen)
  componentDidMount () {
    // after 5 seconds (5000 MS) call the this.handleClose function,
  // setTimeout returns a timeoutId so we can cancel timeout
    this.timeoutId = setTimeout(this.handleClose, 5000)
  }

  // This function will be run when our component is removed from the screen (the DOM)
  componentWillUnmount () {
    // calling clearTimeout will cancel the timer
    // we don't want this.handleClose to be run, if the component has been removed from the screen
    // because this.handleClose tries to modify the components state
    clearTimeout(this.timeoutId)
  }

  // handleClose sets the show state to false so we don't see the AutoDismiss component anymore
  handleClose = () => this.setState({ show: false })

  render () {
    // destructure all of the props given to auto dismiss alert
    const { variant, heading, message, deleteAlert, id } = this.props

    // Delete this alert after the fade animation time (300 ms by default)
    if (!this.state.show) {
      setTimeout(() => {
        deleteAlert(id)
      }, 300)
    }

    return (
      // Show our bootstrap alert
      <Alert
      // the dismissable prop adds an X so that we can dismiss/close the alert
      // if you take this away, the X button disappears
        dismissible
        // if true, will show the alert, otherwise, the alert will be hidden
        show={this.state.show}
        // the variant is the color to use for this alert: primary, danger etc.
        variant={variant}
        // The onClose prop will be run every time someone clicks the close button
        // we want to set the show state to false when that occurs
        // set show to false = handleClose
        onClose={this.handleClose}
      >
        {/* remember that container is from reg Bootstrap! */}
        <div className="container">
          {/* the heading (title) on the alert pop up */}
          <Alert.Heading>
            {heading}
          </Alert.Heading>
          {/* the body of the alert pop up */}
          <p className="alert-body">{message}</p>
        </div>
      </Alert>
    )
  }
}

// export!
export default AutoDismissAlert
