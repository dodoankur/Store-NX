import { connect } from "react-redux"
import { fetchOrders } from "../../orders/reducer"
import List from "../components/list"
import { fetchStatusesIfNeeded, selectStatus } from "../reducer"

const mapStateToProps = state => {
  return {
    items: state.orderStatuses.items,
    selectedId: state.orderStatuses.selectedId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoad: () => {
      dispatch(fetchStatusesIfNeeded())
    },
    onSelect: statusId => {
      dispatch(selectStatus(statusId))
      dispatch(fetchOrders())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
