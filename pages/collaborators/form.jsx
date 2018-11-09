import React from "react";

import { withStyles } from "@material-ui/core/styles";

// Material
import TextField from "../../components/form/TextField";
import Checkbox from "../../components/form/Checkbox";
import SelectInput from "../../components/form/Select";

import { PropTypes } from "prop-types";

import { Form, Field } from "react-final-form";

import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import {
  LinearProgress,
  Select,
  MenuItem,
  InputLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = themes => ({
  textField: {
    width: "100%"
  }
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(3000);
};

const required = value => (value ? undefined : "Obrigatório");
const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);

class FormPage extends React.Component {
  deletePhone = (fields, index) => {
    fields.remove(index);
  };

  render() {
    const { classes } = this.props;
    const { modalForm, handleModalOpen } = this.props;
    const initialValue = {
      phones: [null]
    };
    return (
      <Dialog
        open={modalForm.open}
        onClose={() => handleModalOpen(false)}
        maxWidth="xs"
        fullWidth={true}
      >
        <DialogTitle id="form-dialog-title">Adicionar Profissional</DialogTitle>
        <Form
          onSubmit={onSubmit}
          mutators={{
            ...arrayMutators
          }}
          initialValues={initialValue}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            mutators: { push, pop }
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={24}>
                  <Grid item xs>
                    <Field
                      name="name"
                      label="Nome"
                      component={TextField}
                      fullWidth
                      margin="dense"
                      validate={composeValidators(required)}
                    />
                  </Grid>
                </Grid>
                <FieldArray name="phones">
                  {({ fields }) =>
                    fields.map((name, index) => (
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={24}
                        key={name}
                      >
                        <Grid item xs={4}>
                          <Field
                            name={`${name}.operator`}
                            label="Operator"
                            className={classes.textField}
                            component={SelectInput}
                            margin="dense"
                            options={["VIVO", "CLARO", "TIM"]}
                            validate={composeValidators(required)}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Field
                            name={`${name}.ddd`}
                            label="DDD"
                            className={classes.textField}
                            component={TextField}
                            margin="dense"
                            validate={composeValidators(required)}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <Field
                            name={`${name}.number`}
                            label="Número"
                            className={classes.textField}
                            component={TextField}
                            margin="dense"
                            validate={composeValidators(required)}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            onClick={() => this.deletePhone(fields, index)}
                            disabled={fields.length <= 1}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))
                  }
                </FieldArray>

                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={24}
                >
                  <Grid item>
                    <Button
                      type="button"
                      color="primary"
                      onClick={() => push("phones", undefined)}
                      disabled={values.phones && values.phones.length >= 3}
                    >
                      Adicionar Telefone
                    </Button>
                  </Grid>
                </Grid>

                <Grid container spacing={24}>
                  <Grid item xs>
                    <FormControlLabel
                      control={
                        <Field
                          name="is_active"
                          component={Checkbox}
                          type="checkbox"
                        />
                      }
                      label="Ativo"
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button color="primary" onClick={() => handleModalOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={submitting || pristine}
                >
                  Salvar
                </Button>
              </DialogActions>
            </form>
          )}
        />

        <LinearProgress color="primary" />
      </Dialog>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormPage);
