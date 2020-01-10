import React from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
    const Auth = new AuthService();
    return class AuthWrapped extends React.Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }
        componentWillMount() {
            if (!Auth.loggedIn())
                this.props.history.push('/admin-brandclothing/en/L9E2EWaSg5/GQAXVe6Zhm');
            else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    })
                }
                catch (err) {
                    Auth.logout();
                    this.props.history.push('/admin-brandclothing/en/L9E2EWaSg5/GQAXVe6Zhm');
                }
            }

        }
        render() {
            if (this.state.user) {
                return (
                    <AuthComponent {...this.props} {...this.state} />
                )
            }
            else {
                return null;
            }
        }
    }
}