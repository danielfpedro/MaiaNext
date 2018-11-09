import React from "react";

// Layouts
import Layout from "../../components/layout/dashboard";

import { withStyles } from "@material-ui/core/styles";

// Material
// import TextField from '../../components/form/TextField'
import Checkbox from "../../components/form/Checkbox";

import FormPage from "./form";

import { PropTypes } from "prop-types";
import { Form, Field } from "react-final-form";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import {
  TextField,
  Paper,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  TableFooter,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  Input,
  FormHelperText
} from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";

import DialogConfirm from "../../components/dialogs/confirm";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import Link from "next/link";
import {Router} from '../../routes'

// Components
import BtnAdd from "../../components/BtnAdd"
import CardSearch from "../../components/collaborators/CardSearch"

const styles = theme => ({
  root: {
    maxWidth: "60em"
  },
  table: {
    minWidth: 700
  },
  searchButtonGrid: {
    height: "100%"
  },
})

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalForm: {
        open: false
      },
      modalVisibility: false,
      anchorDropdown: null,
      searchData: {
        nome: "",
        order: ""
      },
      deleteConfirm: {
        open: false,
        title: "Deletar Usuário",
        text: "Deseja realmente bla bla bla?"
      }
    };

    this.handleCancelDeleteConfirm = this.handleCancelDeleteConfirm.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.pesquisar = this.pesquisar.bind(this);
    this.handleConfirmDeleteConfirm = this.handleConfirmDeleteConfirm.bind(
      this
    );
  }

  static getInitialProps = ({ query, params }) => {
    console.log("INITIAL PROPS", query);
    return { router: { query: query } };
  };

  componentWillMount() {
    console.log("State", this.props);
    let searchData = this.state.searchData;
    searchData.nome = this.props.router.query.nome;
    this.setState({ searchData: searchData });

    if (this.props.router.query.flag == "adicionar") {
      this.handleModalOpen(true, false);
    }

    console.log("Com0ponenty will mount");
  }

  componentDidUpdate = (prevProps) => {
    console.log("Com0ponenty did update", prevProps);
    if (prevProps.router.query.flag != this.props.router.query.flag && this.props.router.query.flag == "adicionar") {
      this.handleModalOpen(true, false);
    }
  }

  pesquisar = () => {
    console.log("PESQUISAR", this.state.searchData)
    Router.pushRoute('collaborators', this.state.searchData, {shalow: true})
  }

  handleSearchChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    const searchData = this.state.searchData;
    searchData[name] = value;

    this.setState({ searchData: searchData });
  };
  handleModalOpen(flag, change = true) {
    console.log('Modal open', flag)
    this.setState({ modalForm: {open: flag} })

    if (change) {
      if (flag == false) {
        Router.pushRoute('collaborators')
      } else {
        Router.pushRoute('collaborators.add', {flag: 'adicionar'})
      } 
    }
  }

  openDropdown = event => {
    this.setState({ anchorDropdown: event.currentTarget });
  };
  closeDropdown = event => {
    this.setState({ anchorDropdown: null });
  };

  handleChangePage = (event, page) => {
    console.log("Change Page", page);
  };
  handleChangeRowsPerPage = value => {
    console.log("Change Rows Per Page", value);
  };

  delete = () => {
    let deleteConfirm = this.state.deleteConfirm;
    deleteConfirm.open = true;
    this.setState({
      deleteConfirm: deleteConfirm,
      anchorDropdown: null
    });
  };
  handleCancelDeleteConfirm = () => {
    let deleteConfirm = this.state.deleteConfirm;
    deleteConfirm.open = false;
    this.setState({
      deleteConfirm: deleteConfirm
    });
  };
  handleConfirmDeleteConfirm = () => {
    console.log("Confirmado deletar");
  };

  render() {
    const { classes } = this.props;
    const { deleteConfirm } = this.state;
    const rows = [{ id: 1, name: "Jarbas" }];
    return (
      <Layout>
        <Grid container justify="center">
          <div className={classes.root}>
            <DialogConfirm
              {...deleteConfirm}
              handleCancelDeleteConfirm={this.handleCancelDeleteConfirm}
              handleConfirmDeleteConfirm={this.handleConfirmDeleteConfirm}
            />
            <FormPage
              modalForm={this.state.modalForm}
              handleModalOpen={this.handleModalOpen}
            />

            <BtnAdd label="Profissional" handleModalOpen={this.handleModalOpen} />

            {/* CARD PESQUISAR */}
            <CardSearch
              searchData={this.state.searchData}
              handleSearchChange={this.handleSearchChange} />

            <Grid container>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor="age-label-placeholder">
                  Ordenar por:
                </InputLabel>
                <Select
                  value={this.state.searchData.order}
                  onChange={e => this.handleSearchChange(e)}
                  input={<Input name="order" id="age-label-placeholder" />}
                  displayEmpty
                  name="order"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={e => this.openDropdown(e)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="simple-menu"
                          anchorEl={this.state.anchorDropdown}
                          open={Boolean(this.state.anchorDropdown)}
                          onClose={() =>
                            this.setState({ anchorDropdown: null })
                          }
                        >
                          <MenuItem onClick={() => this.closeDropdown()}>
                            Editar
                          </MenuItem>
                          <MenuItem onClick={() => this.delete()}>
                            Deletar
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={3}
                    count={500}
                    rowsPerPage={10}
                    page={1}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Grid>
      </Layout>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
