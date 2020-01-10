import React from 'react';
import withAuth from './withAuth';
import AuthService from './AuthService';
const Auth=new AuthService();
class cc extends React.Component{
    render() {
        return(
            <div>
                dsdasd
       <button onClick={this.handlelogout.bind(this)}>Logout</button>

            </div>
        )
    
    }

    handlelogout(){
        Auth.logout();
        this.props.history.replace('/login-dfd-dfdf-dsf-sdfsd-fsdf');
      }     
}
export default withAuth(cc);
