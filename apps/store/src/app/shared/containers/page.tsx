import { PageContainer } from "@store/theme"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { mapDispatchToProps, mapStateToProps } from "../containerProps"

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PageContainer)
)
