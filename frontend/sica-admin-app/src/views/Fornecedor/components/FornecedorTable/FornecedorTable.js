import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import { Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Fab,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  Grid,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';

import { Creators as actions } from './../../../../store/actions/fornecedor';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  actions: {
    justifyContent: 'flex-end'
  },  
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  actionSearchContent:{
    display: 'flex',
    alignContent: 'center',
  },
  button:{
    color:'#FFFFFF',
    backgroundColor:'#235244',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#14352c'
    }
  },  
  buttonDelete:{
    color: '#c62828'
  },
  buttonLabel:{
    color: '#235244'
  },
  colAction:{
    textAlign: 'center'
  },
  contentActionTop:{
    textAlign: 'right'
  },
  loadingContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  }

}));

const FornecedorTable = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    nome: ''
  })
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id'); 
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  
  const dispatch = useDispatch();
  useFetching(dispatch, actions.buscaListFornecedores(values, page, rowsPerPage, order, orderBy));

  const fornecedors = useSelector( state  => state.fornecedor.data );
  //const totalPages = useSelector( state  => state.fornecedor.totalPages );
  //const itemsCountPerPage = useSelector( state  => state.fornecedor.itemsCountPerPage );
  const totalElements = useSelector( state  => state.fornecedor.totalElements );
  const loading = useSelector( state  => state.fornecedor.loading );

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handlePageChange = (event, page) => {
    setPage(page);
    dispatch(actions.buscaListFornecedores(values, page, rowsPerPage, order, orderBy),[])
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(actions.buscaListFornecedores(values, page, event.target.value, order, orderBy),[])
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';    
    dispatch(actions.buscaListFornecedores(values, page, rowsPerPage, isAsc ? 'desc' : 'asc', property),[])
    let valorOrder =isAsc ? 'desc' : 'asc'
    setOrder(valorOrder);
    setOrderBy(property);
  }

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(actions.buscaListFornecedores(values, page, rowsPerPage, order, orderBy),[])
  }

  const handleClickOpen = value => {
    setId(value)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setId('')
  };

  const handleRemove = event => {
    event.preventDefault();
    dispatch(actions.deleteFornecedor(id, values, page, rowsPerPage, order, orderBy),[])  
    setOpen(false);
  };

  const headCells = [
    { id: 'acao', numeric: false, disablePadding: false, label: '' },
    { id: 'nome', numeric: false, disablePadding: false, label: 'Nome' } ,    
    { id: 'endereco', numeric: false, disablePadding: false, label: 'Endereco' } ,
    { id: 'numero', numeric: true, disablePadding: false, label: 'Numero' } ,
    { id: 'bairro', numeric: false, disablePadding: false, label: 'Bairro' } ,
    { id: 'cidade', numeric: false, disablePadding: false, label: 'Cidade' } ,
    { id: 'uf', numeric: false, disablePadding: false, label: 'UF' } , 
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' } ,    
    { id: 'telefone', numeric: false, disablePadding: false, label: 'Telefone:' } ,     
  ];
  /* eslint-disable react/prop-types */
  /* eslint-disable react/no-multi-comp */
  const EnhancedTableHead = (props) => {
    const { classes,  order, orderBy, onRequestSort } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };  
    return (
      <TableHead>
        <TableRow>
          {headCells.map(headCell => (
            <TableCell
              align={headCell.numeric ? 'right' : 'left'}
              key={headCell.id}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={order}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
 
  return (
    <div>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
        >
          <CardHeader
            subheader="Pesquisar"
            title="Fornecedor de Insumos"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Nome:"
                  margin="dense"
                  name="nome"
                  onChange={handleChange}
                  required
                  value={values.nome}
                  variant="outlined"
                />
              </Grid>  
              <Grid
                className={classes.actionSearchContent}
                item
                md={6}
                xs={12}
              >            
                <Fab
                  aria-label="pesquisar"
                  className={classes.button}
                  type="submit"
                >
                  <SearchIcon />
                </Fab>
              </Grid>              
            </Grid>
          </CardContent>
        </form>
      </Card>
      <br/>
      <div className={classes.contentActionTop}>
        < RouterLink to="/fornecedor/new">
          <Fab
            aria-label="add"
            className={classes.button}
            color="primary"
            size="medium"
            variant="extended"
          >
            <AddIcon />
          Cadastrar
          </Fab>
        </ RouterLink>
      </div>
      <br/>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <EnhancedTableHead
                  classes={classes}
                  onRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                />
                <TableBody>
                  { !loading && (fornecedors.map(fornecedor => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={fornecedor.id}
                    > 
                      <TableCell style={{ width: 165 }}>
                        <div
                          className={classes.colAction}
                          style={{ width: 150 }}
                        >
                          <Tooltip title="Excluir">
                            <IconButton
                              aria-label="Excluir"
                              className={classes.buttonDelete}
                              onClick={() => handleClickOpen(fornecedor.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          < RouterLink to={'fornecedor/'+ fornecedor.id}>
                            <Tooltip title="Editar">
                              <IconButton
                                aria-label="Editar"
                                className={classes.buttonLabel}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </ RouterLink>
                          < RouterLink to={'pedidos/fornecedor/'+ fornecedor.id}>
                            <Tooltip title="Fazer Pedido">
                              <IconButton
                                aria-label="Pedido"                      
                              >
                                <ShoppingCartIcon />
                              </IconButton>
                            </Tooltip>
                          </ RouterLink>
                          
                        </div>
                      </TableCell>            
                      <TableCell ><div style={{minWidth: '160px'}}>{fornecedor.nome}</div></TableCell>
                      <TableCell>{fornecedor.endereco}</TableCell>
                      <TableCell>{fornecedor.numero}</TableCell>
                      <TableCell>{fornecedor.bairro}</TableCell>
                      <TableCell>{fornecedor.cidade}</TableCell>
                      <TableCell>{fornecedor.uf}</TableCell>
                      <TableCell>{fornecedor.email}</TableCell>
                      <TableCell ><div style={{ width: 120 }}>{fornecedor.telefone}</div></TableCell> 
                     
                    </TableRow>
                  )))}

                  { loading && (
                    <TableRow
                      className={classes.tableRow}
                      hover
                    >
                      <TableCell colSpan={9} >
                        <div className={classes.loadingContent}>
                          <CircularProgress />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  { (totalElements === 0 && !loading) && (
                    <TableRow
                      className={classes.tableRow}
                      hover
                    >
                      <TableCell colSpan={9} >
                        <div >
                          <h5>Nenhum registro encontrado!</h5>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={totalElements}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleRowsPerPageChange}
            page={totalElements === 0 ? 0 : page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>

      <Dialog
        aria-describedby="alert-dialog-slide-description"
        aria-labelledby="alert-dialog-slide-title"
        keepMounted
        onClose={handleClose}
        open={open}
      >
        <DialogTitle id="alert-dialog-slide-title">{'Exclusão'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Deseja excluir esse registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.buttonLabel}
            onClick={handleClose}
          >
            Não
          </Button>
          <Button
            className={classes.buttonLabel}
            onClick={handleRemove}
          >
            Sim
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};


const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {
    dispatch(action);
    /* eslint-disable-next-line */
  }, array)
}

FornecedorTable.propTypes = {
  className: PropTypes.string
};

export default FornecedorTable;
