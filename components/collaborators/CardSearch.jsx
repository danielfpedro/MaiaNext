import React from "react";
import { Paper, Grid, TextField, Button } from "@material-ui/core";

import { PropTypes } from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//Icons
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  iconLeft: {
    marginRight: theme.spacing.unit / 2
  },
  paperSearch: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  }
});

class CardSearch extends React.Component {
  render() {
    const { classes, handleSearchChange, searchData } = this.props;
    console.log("CLASSES", classes);
    
    return (
      <Paper elevation={1} className={classes.paperSearch}>
        <Grid container>
          <Grid item md={5}>
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              label="Nome"
              defaultValue={searchData.nome}
              onChange={e => handleSearchChange(e)}
              name="nome"
              fullWidth
            />
          </Grid>
          <Grid item md>
            <Grid
              container
              justify="flex-end"
              alignItems="flex-end"
              style={{ height: "100%" }}
            >
              <Button variant="contained" color="primary">
                <SearchIcon className={classes.iconLeft} /> Pesquisar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
export default withStyles(styles)(CardSearch);
