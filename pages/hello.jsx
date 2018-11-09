import React from 'react'

import { withStyles } from '@material-ui/core/styles'

// Material
import TextField from '../components/form/TextField'
import Checkbox from '../components/form/Checkbox'

import { PropTypes } from 'prop-types';
import { Form, Field } from 'react-final-form'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Modal from '@material-ui/core/Modal'

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  
const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
    card: {
        width: theme.spacing.unit * 50,
        position: 'absolute',
    }
  });

const onSubmit = values => {
  console.log("dasdsa dasdsa", values)
  // await sleep(300)
  // window.alert(JSON.stringify(values, 0, 2))
}

const required = value => (value ? undefined : "Required");
const composeValidators = (...validators) => value =>
validators.reduce((error, validator) => error || validator(value), undefined);

class Add extends React.Component {
  render () {
    const { classes, modalVisibility, setModalVisibility } = this.props;

    return (
        <Modal
            open={modalVisibility}
        >
        <Card className={classes.card}>
            <CardContent>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid container direction="column">
                        <Grid item>
                            <Field
                            name="firstName"
                            label="Name"
                            component={TextField}
                            validate={composeValidators(required)}
                            />
                        </Grid>
                        <Grid item>
                            <Field
                            name="lastName"
                            label="Last Name"
                            component={TextField}
                            />
                        </Grid>
                        <Grid item>
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
                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </form>
                )}/>
            </CardContent>
            <CardActions>
                <Button color="primary" onClick={() => setModalVisibility(false)}>
                    Cancelar
                </Button>
                <Button color="primary">
                    Salvar
                </Button>
        </CardActions>
        </Card>

      </Modal>
    )
  }
}

Add.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Add);
