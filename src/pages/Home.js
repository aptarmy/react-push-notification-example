import React, { Component } from 'react';
import { connect } from 'react-redux';

import notificationsAction from '../actions/notifications';

class Home extends Component {

	toggleSubscription() {
		if(!this.props.notificationSubscription) {
			// subscribe user to notification
			notificationsAction.registerSubscription();
		} else {
			// unsubscribe user
			notificationsAction.unregisterSubscription()
		}
	}

  render() {
    return (
     <div id="main" className="ui container">
     	<div className="ui segment">
	      <h1 className="ui header">{this.props.pageTitle}</h1>
	      
	      {(this.props.isBrowserSupported === undefined) && (<p>Loading...</p>)}
	      {(this.props.isBrowserSupported === false) && (<p>Your browser doesn't support service worker.</p>)}
	      
	      {(this.props.isBrowserSupported) && (
	      	<button
	      		className="ui button"
	      		onClick={this.toggleSubscription.bind(this)}
	      		disabled={!(this.props.isRegisteredWorker &&
	      			this.props.isEnabledNotifications !== false
	      		)}>
	      			{(!this.props.notificationSubscription) ? 'Subscribe To Notification' : 'Unsubscribe To Notification'}
	      		</button>
	      )}
	    </div>

      {(this.props.notificationSubscription) && (
      	<div className="ui segment">
      		<div className="ui form">
      			<p>Once you've subscribed your user, you'd send their subscription to your
			      server to store in a database so that when you want to send a message
			      you can lookup the subscription and send a message to it.</p>
			      <p>To simplify things for this code lab copy the following details
			      into the <a href="https://web-push-codelab.glitch.me/">Push Companion
			      Site</a> and it'll send a push message for you, using the application
			      server keys on the site - so make sure they match.</p>
			      <h2>User's subscription</h2>
			      <p>we can think of this as a user indentifier.</p>
			      <div className="ui divider"></div>
			      <div className="field">
					    <textarea defaultValue={JSON.stringify(this.props.notificationSubscription)}></textarea>
					  </div>
      		</div>
				</div>
	    )}
     </div>
    );
  }
}

const mapStateToProps = (state) => {
	return {
		isBrowserSupported: state.notifications.isBrowserSupported,
		isRegisteredWorker: state.notifications.isRegisteredWorker,
		isEnabledNotifications: state.notifications.isEnabledNotifications,
		notificationSubscription: state.notifications.subscription,
		pageTitle: state.pages.home.title
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);