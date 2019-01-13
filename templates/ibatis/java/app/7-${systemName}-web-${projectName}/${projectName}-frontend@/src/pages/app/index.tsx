import React from 'react'
import {AppProps} from "@i/interfaces/AppFaces";
import {ConnectionPros} from "@utils/DvaUtil";
import withRouter from "umi/withRouter";
import {connect} from 'dva'
import StatesAlias from "@i/configs/tradeApp-statesAlias";

type AppPagesProps = AppProps & ConnectionPros;

const appPage = ({children, dispatch, appState, loading, location}: AppPagesProps) => {
  return (
    <div>
    {children}
    </div>
  )
}
function mapStateToProps(states:StatesAlias & ConnectionPros){
  const state :AppPagesProps={
    appState :states.app,
    loading:states.loading,
  }
  return state;
}

export default withRouter(connect(mapStateToProps)(appPage))
