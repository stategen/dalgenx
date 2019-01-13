import React from 'react';
import {LocaleProvider} from 'antd'
import enUS from 'antd/es/locale-provider/en_US'
import withRouter from 'umi/withRouter'
import App from '@pages/app'
import Loading from "@components/loading";

export default withRouter((props) => {
    return (
      <LocaleProvider locale={enUS}>
        <App>
          {/*<Loading isLoading={props.global}/>*/}
          {props.children}
        </App>
      </LocaleProvider>
    )
  }
);

