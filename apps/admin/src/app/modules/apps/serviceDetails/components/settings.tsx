import { Button, Divider, Paper } from "@material-ui/core"
import { TextField } from "mui-rff"
import React, { FC } from "react"
import { Form } from "react-final-form"
import { messages } from "../../../../lib"
import { CustomToggle } from "../../../shared/form"
import style from "./style.module.sass"
interface props {
  initialValues: {}
  onSubmit: Function
}

const ServiceSettingsForm: FC<props> = (props: props) => {
  const { initialValues, onSubmit } = props
  const fields = Object.keys(initialValues).map((key, index) => {
    const value = initialValues[key]
    return (
      <div key={index}>
        {typeof value === "boolean" && (
          <>
            <CustomToggle
              name={key}
              fullWidth={false}
              label={key}
              style={{ paddingTop: 16, paddingBottom: 16, width: "auto" }}
            />
            <Divider />
          </>
        )}

        {typeof value === "number" && (
          <TextField fullWidth type="number" name={key} label={key} />
        )}

        {typeof value !== "boolean" && typeof value !== "number" && (
          <TextField fullWidth name={key} label={key} />
        )}
      </div>
    )
  })

  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div className="gray-title" style={{ margin: "0 0 15px 20px" }}>
        {messages.drawer_settings}
      </div>
      <Form
        onSubmit={() => onSubmit}
        initialValues={initialValues}
        enableReinitialize
      >
        {({ handleSubmit, pristine, submitting }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "initial",
              width: "100%",
            }}
          >
            <Paper style={{ margin: "0px 20px" }} elevation={4}>
              <div style={{ padding: "10px 30px 30px 30px" }}>{fields}</div>
              <div
                className="buttons-box"
                style={{ display: pristine ? "none" : "block" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={style.button}
                  disabled={pristine || submitting}
                >
                  {messages.save}
                </Button>
              </div>
            </Paper>
          </form>
        )}
      </Form>
    </div>
  )
}

export default ServiceSettingsForm
