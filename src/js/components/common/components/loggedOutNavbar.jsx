import React from 'react';
import { Link } from 'react-router';
import NewLoginContent from 'src/js/components/pages/loginContainer/containers/newLoginContent';

import twLogo from 'public/static/images/twLogo.png';

class LoggedOutNavbar extends React.Component {
  render() {

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid nopad">
                <div className="navbar-header">
                    <Link className="navbar-brand navPad" to="/">
                        <img src={twLogo} />
                    </Link>
                </div>
                <NewLoginContent />
            </div>
        </nav>
    );
  }
}

export default LoggedOutNavbar;
