import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { deletePage } from "../reducer"
import Buttons from "./components/headButtons"

const mapStateToProps = (state, ownProps) => {
  return {
    page: state.pages.pageEdit,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onDelete: id => {
      dispatch(deletePage(id))
      ownProps.history.push("/pages")
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Buttons))
