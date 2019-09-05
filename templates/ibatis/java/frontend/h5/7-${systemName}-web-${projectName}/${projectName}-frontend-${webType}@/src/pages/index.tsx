
import React from 'react';
import router from 'umi/router';

import Redirect from 'umi/redirect'
import {homeInitModel} from "@i/interfaces/HomeFaces";

export default () => <Redirect to={homeInitModel.pathname} />


// class Index extends React.PureComponent {
//     componentDidMount() {
//         router.replace('/home');
//     }
//     render() {
//         return null;
//     }
// }
//
// export default Index;
