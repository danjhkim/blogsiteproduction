import React from 'react';

const Context = React.createContext();

// u can do something like createContext('hehe')
// and set a default this is the defautl value appreach
// this is how you set a "store" to mimick redux store

//Context must have capital C

export class LoginStore extends React.Component {
	state = {
		isSignedIn: false,
		userId: {},
		name: null,
		showOthers: true,
	};

	signIn = (id, name) => {
		this.setState({
			isSignedIn: true,
			userId: id,
			name: name,
		});
	};

	checkBox = () => {
		this.setState({
			showOthers: !this.state.showOthers,
		});
	};

	signOut = () => {
		this.setState({
			isSignedIn: false,
			userId: null,
			name: null,
		});
	};

	onSignInClick = () => {
		this.auth.signIn();
	};

	onSignOutClick = () => {
		this.auth.signOut();
	};

	onAuthChange = isSignedIn => {
		if (isSignedIn) {
			this.signIn(this.auth.currentUser.get().getId());
			this.auth.isSignedIn.get();
		} else {
			this.signOut();
		}
	};

	loadAuth = () => {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId:
						'827341131046-uhc8lub3mabr335e3qf486e1p4sr6kto.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance();

					this.onAuthChange(this.auth.isSignedIn.get());
					//this checks if u are logged in immediately after the site is loaded. and sets the state
					this.auth.isSignedIn.listen(this.onAuthChange);
					//we need a second listener to see if u login after the website loaded. u can prob do this with an eventlistener but google provices the listen function. so when it changes u execute the onAuthChange function
				});
		});
	};

	render() {
		return (
			<Context.Provider
				value={{
					...this.state,
					signOut: this.signOut,
					signIn: this.signIn,
					loadAuth: this.loadAuth,
					onSignInClick: this.onSignInClick,
					onSignOutClick: this.onSignOutClick,
					checkBox: this.checkBox,
				}}>
				{this.props.children}
			</Context.Provider>
		);
	}
}
//this is a file with state and functions that is wrapped around the components that need those states and functions.

export default Context;
