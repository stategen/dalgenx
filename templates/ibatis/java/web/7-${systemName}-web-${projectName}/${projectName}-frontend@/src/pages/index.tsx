import Redirect from 'umi/redirect'
import {homeInitModel} from "@i/interfaces/HomeFaces";

export default () => <Redirect to={homeInitModel.pathname} />
