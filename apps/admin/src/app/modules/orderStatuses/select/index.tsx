import { connect } from "react-redux"
import List from "../components/list"
import { fetchStatusesIfNeeded } from "../reducer"

const mapStateToProps = state => {
  return {
    items: state.orderStatuses.items,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchStatusesIfNeeded())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
