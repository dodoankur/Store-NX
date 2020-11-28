import { connect } from "react-redux"
import { webstoreAuth } from "../../../lib"
import { fetchAccount, updateAccount, updateDeveloperAccount } from "../reducer"
import Details from "./components/details"

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.apps.account,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchData: () => {
      const webstoreAuthorized = webstoreAuth.isCurrentTokenValid()
      if (webstoreAuthorized) {
        dispatch(fetchAccount())
      } else {
        ownProps.history.push("/admin/apps/login")
      }
    },
    onAccountSubmit: values => {
      dispatch(updateAccount(values))
    },
    onDeveloperSubmit: values => {
      dispatch(updateDeveloperAccount(values))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
