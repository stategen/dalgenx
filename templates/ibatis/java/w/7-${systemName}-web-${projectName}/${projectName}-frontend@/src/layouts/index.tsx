import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import withRouter from 'umi/withRouter'
import App from '@pages/app'
import {DvaChild} from "@utils/DvaUtil";

export default withRouter((props) => {
  return (
    <LocaleProvider locale={enUS}>
      <App>
        { props.children }
      </App>
    </LocaleProvider>
  )
})
