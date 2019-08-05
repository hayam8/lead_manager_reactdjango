import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  /**
   * runs when you get new prop
   * Pulls error from server and prints to app
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props; // pull out error and alert
    if (error != prevProps.error) {
      if (error.msg.name) {
        alert.error(`Name: ${error.msg.name.join()}`);
      }
      if (error.msg.email) {
        alert.error(`Email: ${error.msg.email.join()}`);
      }
      if (error.msg.message) {
        alert.error(`Message: ${error.msg.message.join()}`);
      }
    }
    // check for message change
    if (message !== prevProps.message) {
      if (message.deleteLead) {
        alert.success(message.deleteLead);
      }
      if (message.addLead) {
        alert.success(message.addLead);
      }
    }
  }

  render() {
    return <Fragment />;
  }
}

// map state to props
const mapStateToProps = state => ({
  error: state.errors, // any errors in state become props
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
