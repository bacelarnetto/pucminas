import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import { Link as RouterLink, Redirect} from 'react-router-dom';
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
import Tooltip from '@material-ui/core/Tooltip';

import { Creators as actions } from './../../../../store/actions/barragem';

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

const BarragemTable = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    descricao: ''
  })
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id'); 
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  
  const dispatch = useDispatch();
  useFetching(dispatch, actions.buscaListBarragens(values, page, rowsPerPage, order, orderBy));

  const barragens = useSelector( state  => state.barragem.data );
  //const totalPages = useSelector( state  => state.barragem.totalPages );
  //const itemsCountPerPage = useSelector( state  => state.barragem.itemsCountPerPage );
  const totalElements = useSelector( state  => state.barragem.totalElements );
  const loading = useSelector( state  => state.barragem.loading );
  const erro = useSelector( state  => state.barragem.erro );
  const codigoErro = useSelector( state  => state.barragem.codigoErro );

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handlePageChange = (event, page) => {
    setPage(page);
    dispatch(actions.buscaListBarragens(values, page, rowsPerPage, order, orderBy),[])
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(actions.buscaListBarragens(values, page, event.target.value, order, orderBy),[])
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';    
    dispatch(actions.buscaListBarragens(values, page, rowsPerPage, isAsc ? 'desc' : 'asc', property),[])
    let valorOrder =isAsc ? 'desc' : 'asc'
    setOrder(valorOrder);
    setOrderBy(property);
  }

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(actions.buscaListBarragens(values, page, rowsPerPage, order, orderBy),[])
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
    dispatch(actions.deleteBarragem(id, values, page, rowsPerPage, order, orderBy),[])  
    setOpen(false);
  };

  const headCells = [
    { id: 'acao', numeric: false, disablePadding: false, label: '' },
    { id: 'descricao', numeric: false, disablePadding: false, label: 'Nome' } ,
    { id: 'minerio', numeric: false, disablePadding: false, label: 'Minerio' } ,
    { id: 'tipo', numeric: false, disablePadding: false, label: 'Tipo' } ,
    { id: 'categoriaRisco', numeric: false, disablePadding: false, label: 'Risco' } ,
    { id: 'danoPotencialAssociado', numeric: false, disablePadding: false, label: 'Dano em Potencial' } ,
    { id: 'objetivoContencao', numeric: false, disablePadding: false, label: 'Contenção' } ,
    { id: 'situacaoOperacional', numeric: false, disablePadding: false, label: 'Situação Operacional' } ,
    { id: 'alimentadoUsina', numeric: false, disablePadding: false, label: 'Alimentado por Usina' } ,
    { id: 'empreendedor', numeric: false, disablePadding: false, label: 'Empreendedor' } ,
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

  const colorStatus = id => {
    let color = ''
    if (id === 1 ){
      //Baixo
      color = '#107B2D'
    } else if (id === 2) {
      //Medio
      color = '#ff8000'
    } else {
      //Alto
      color = '#BA1717'
    } 
    return color
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
            title="Barragem"
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
                  name="descricao"
                  onChange={handleChange}
                  required
                  value={values.descricao}
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
        < RouterLink to="/barragem/new">
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
                  { !loading && (barragens.map(barragem => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={barragem.id}
                    > 
                      <TableCell  style={{ width: 120 }}>
                        <div
                          className={classes.colAction}
                          style={{ width: 110 }}
                        >
                          <Tooltip title="Excluir">
                            <IconButton
                              aria-label="Excluir"
                              className={classes.buttonDelete}
                              onClick={() => handleClickOpen(barragem.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                          < RouterLink to={'barragem/'+ barragem.id}>
                            <Tooltip title="Editar">
                              <IconButton
                                aria-label="Editar"
                                className={classes.buttonLabel}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          </ RouterLink>
                        </div>
                      </TableCell>            
                      <TableCell><div style={{minWidth: '160px'}}>{barragem.descricao}</div></TableCell>
                      <TableCell>{barragem.minerio}</TableCell>
                      <TableCell>{barragem.tipo.nome}</TableCell>
                      <TableCell 
                        style={{color: colorStatus(barragem.categoriaRisco.codigo), fontWeight: 'bold'}}
                      >{barragem.categoriaRisco.descricao}</TableCell>
                      <TableCell
                        style={{color: colorStatus(barragem.danoPotencialAssociado.codigo), fontWeight: 'bold'}}
                      >{barragem.danoPotencialAssociado.descricao}</TableCell>
                      <TableCell>{barragem.objetivoContencao.descricao}</TableCell>
                      <TableCell>{barragem.situacaoOperacional.descricao}</TableCell>
                      <TableCell>{barragem.alimentadoUsina}</TableCell>
                      <TableCell>{barragem.empreendedor}</TableCell>
                    </TableRow>
                  )))}

                  { loading && (
                    <TableRow
                      className={classes.tableRow}
                      hover
                    >
                      <TableCell colSpan={10} >
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
                      <TableCell colSpan={10} >
                        <div className={classes.loadingContent}>
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

      { erro && (
        (codigoErro === 403 && (<Redirect to={'/not-unauthorized'}/>))||
        (codigoErro === 500 && (<Redirect to={'/'}/>))
      )}

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

BarragemTable.propTypes = {
  className: PropTypes.string
};

export default BarragemTable;
