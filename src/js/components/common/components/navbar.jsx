import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { bindHandlers } from 'react-bind-handlers';
import cx from 'classnames';

import twLogo from 'public/static/images/twLogo.png';

class Navbar extends React.Component {

    constructor(){
        super();
        this.state = {
            viewDropdown: false,
        };
    }

    handleViewDropdown() {
        this.setState({
            viewDropdown: !this.state.viewDropdown
        }, () =>
            (this.state.viewDropdown? this.refs.dropdownElm.focus() : '')
        );
    }

    handleHideDropdown() {
        this.setState({
            viewDropdown: false
        });
    }

    handleProfileLinkClick() {
        this.props.router.push('/profile');
    }

    render() {

    	const { isEnabled, addFakeNavSpace, userInfo, onLogoutClick } = this.props;
        const { viewDropdown } = this.state;

        if (isEnabled) {
            return (
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid nopad">
                        {/* Brand and toggle get grouped for better mobile display --> */}
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand navPad" to="/">
                                <img src={twLogo} />
                            </Link>
                        </div>

                        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                        <div className="collapse navbar-collapse nopad" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav navbar-right navPad">
                                {
                                    userInfo?
                                    <li className={cx("dropdown", { 'open': viewDropdown })}>
                                        <a  href="#"
                                            className="dropdown-toggle"
                                            onClick={this.handleViewDropdown}>{`Hello! ${userInfo.name}`} <span className="caret"></span>
                                        </a>
                                        <ul ref="dropdownElm" className="dropdown-menu" tabIndex="0" onBlur={this.handleHideDropdown}>
                                            <li><a onMouseDown={this.handleProfileLinkClick }>Profile</a></li>
                                            <li><a href="#" onMouseDown={onLogoutClick}>Logout</a></li>
                                        </ul>
                                    </li>
                                    :
                                    [
                                        <li key="login"><Link to="/login" className="loginSap">Login</Link></li>,
                                        <li key="register"><Link to="/register">Signup</Link></li>
                                    ]
                                }
                            </ul>
                            <div className="col-lg-12 menu navPad">
                                <ul className="nav navbar-nav navbar-right">
                                    <li><a href="//www.thirdwatch.ai/" target="_blank">Our products</a></li>
                                    <li><a href="//api.thirdwatch.ai/" target="_blank">Docs</a></li>
                                    <li><a href="//www.thirdwatch.ai/" target="_blank">Pricing</a></li>
                                    <li><a href="mailto:hello@thirdwatch.ai" target="_blank">Support</a></li>
                                </ul>
                            </div>
                        </div>
                        {/* <!-- /.navbar-collapse --> */}
                        {
                            addFakeNavSpace &&
                            <div className="navFakeSpace">
                                <div></div>
                            </div>
                        }
                    </div>
                </nav>
            );
        }
        return null;
    }
}

Navbar.defaultProps = {
  addFakeNavSpace: true,
  isEnabled: true,
};

export default bindHandlers(Navbar);
