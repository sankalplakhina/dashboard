import React from 'react';
import { Link } from 'react-router';

class NotFound extends React.Component {
  render() {
    return (
		<div className="container-fluid text-center">
	    	<div className="error-404">
	    		Ooops! You have reached a 404 Not Found situation.
	    		Let's get you home?	<Link to="/">Go Home</Link>
	    	</div>
    	</div>
    );
  }
}

export default NotFound;
