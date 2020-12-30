import { Button, Grid, Paper } from "@material-ui/core"
import { TextField } from "mui-rff"
import React, { FC } from "react"
import { Form } from "react-final-form"
import { messages } from "../../../../lib"
import style from "./style.module.sass"

interface props {
  initialValues: {}
  onSubmit: Function
}

const DeveloperForm: FC<props> = (props: props) => {
  const { initialValues, onSubmit } = props

  const formFields = [
    {
      field: <TextField fullWidth name="name" label={messages.fullName} />,
    },
    {
      field: (
        <TextField
          fullWidth
          name="description"
          label={messages.description}
          multiline
          rows={1}
        />
      ),
    },
    {
      field: <TextField fullWidth name="website" label={messages.website} />,
    },
    {
      field: <TextField fullWidth name="email" label={messages.email} />,
    },
  ]

  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <div className="gray-title" style={{ margin: "15px 0 15px 20px" }}>
        {messages.developerProfile}
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
              <Grid container alignItems="flex-start" spacing={2}>
                <div style={{ padding: "10px 30px 30px 30px" }}>
                  {formFields.map((item, index) => (
                    <Grid item xs={6} key={index}>
                      {item.field}
                    </Grid>
                  ))}
                </div>
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
              </Grid>
            </Paper>
          </form>
        )}
      </Form>
    </div>
  )
}

export default DeveloperForm
