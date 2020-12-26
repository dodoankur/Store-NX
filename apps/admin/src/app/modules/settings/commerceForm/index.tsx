import { connect } from "react-redux"
import { fetchCommerceSettings, updateCommerceSettings } from "../reducer"
import Form from "./components/form"

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.settings.commerceSettings,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLoad: () => {
      const { fieldName } = ownProps.match.params
      dispatch(fetchCommerceSettings(fieldName))
    },
    onSubmit: values => {
      dispatch(updateCommerceSettings(values))
      ownProps.history.push("/settings/general/commerceform")
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
