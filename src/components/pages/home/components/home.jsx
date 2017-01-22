/* eslint react/prefer-stateless-function: 0 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

// import style from '../home.less';

class Home extends React.Component {
  render() {
    return (<Helmet title="Thirdwatch - Mobile Data Management Platform"/>);
  }
}

export default Home;
