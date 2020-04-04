import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink} from 'react-router-dom';
import clsx from 'clsx';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import {
  Fab,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Typography,
  TablePagination,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


import { Creators as actions } from './../../../../store/actions/pedido';

const useStyles = makeStyles(theme => ({
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
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '23.33%',
  },
  headingStatus: {
    fontSize: theme.typography.pxToRem(15),
  },

}));

const PedidoTable = props => {
  const { className,  keyFornecedor,...rest } = props;
  
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  
  const dispatch = useDispatch();
  useFetching(dispatch, actions.buscaListPedidos(keyFornecedor, page, rowsPerPage));

  const pedidos = useSelector( state  => state.pedido.data );
  const totalElements = useSelector( state  => state.pedido.totalElements );
  const loading = useSelector( state  => state.pedido.loading );

  const handlePageChange = (event, page) => {
    setPage(page);
    dispatch(actions.buscaListPedidos(keyFornecedor, page, rowsPerPage),[])
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(actions.buscaListPedidos(keyFornecedor, page, event.target.value),[])
  };

  
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
    dispatch(actions.deletePedido(id, keyFornecedor, page, rowsPerPage),[])  
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandedChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNotExpandedChange = () => () => {
    setExpanded(false);
  };
 
  const colorStatus = id => {
    let color = ''
    if (id === 1){
      //Enviado
      color = '#0080ff'
    } else if (id === 2){
      //Confirmação de Recebimento
      color = '#B8FF33'
    } else if (id === 3) {
      //Pendente
      color = '#ff8000'
    } else if (id === 4 ){
      //Em transporte
      color = '#8000ff'
    } else if (id === 5 ){
      //Efetivado
      color = '#107B2D'
    } else if (id === 6 ){
      //Cancelado
      color = '#BA1717'
    } else{
      // Cancelado pelo Fornecedor
      color = '#BA1717'
    }
    return color
  }

  return (
    <div>

      <br/>
  
      <div className={classes.contentActionTop}>
        < RouterLink to={`/pedidos/fornecedor/${keyFornecedor}/pedido/new`}>
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
        &nbsp;&nbsp;&nbsp;
        <RouterLink to="/fornecedor">
          <Button
            className={classes.buttonVoltar}
          ><ArrowBackIcon/> Voltar</Button>            
        </RouterLink>
      </div>
      <br/>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <CardHeader
          subheader="Lista"
          title="Pedidos"
        />
      </Card>
      
      { !loading && (pedidos.map(pedido => (
        
        <ExpansionPanel
          expanded={expanded === `panel${pedido.id}`}
          key={pedido.id}
          onChange={handleExpandedChange(`panel${pedido.id}`)}
        >
          <ExpansionPanelSummary
            aria-controls="panel1bh-content"
            expandIcon={<ExpandMoreIcon />}
            id="panel1bh-header"
          > 
            <Typography className={classes.heading}>Pedido: {pedido.id}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp; Fornecedor: {pedido.fornecedor.nome}</Typography>
            <Typography className={classes.secondaryHeading}>{pedido.instante}</Typography>
            <Typography
              className={classes.headingStatus}
              style={{color: colorStatus(pedido.statusPedidoEnum.codigo), fontWeight: 'bold'}}
            > &nbsp;&nbsp;&nbsp;&nbsp;{pedido.statusPedidoEnum.descricao}</Typography> 
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

            <PerfectScrollbar
            //component={Paper}
              style={{width:'100%'}}
            >
              <Table
                aria-label="a dense table"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell align="right">Quantidade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pedido.itens.map(item => (
                    <TableRow key={item.id}>
                      <TableCell
                        component="th"
                        scope="row"
                      >
                        {item.descricao}
                      </TableCell>
                      <TableCell >{item.marca}</TableCell>
                      <TableCell >{item.tipoInsumo.nome}</TableCell>
                      <TableCell align="right">{item.quantidade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </PerfectScrollbar>
          
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <IconButton
              aria-label="Excluir"
              className={classes.buttonDelete}
              onClick={() => handleClickOpen(pedido.id)}
            >
              <DeleteIcon />
            </IconButton>
            < RouterLink to={`/pedidos/fornecedor/${keyFornecedor}/pedido/${pedido.id}`}>
              <IconButton
                aria-label="Editar"
                className={classes.buttonLabel}
                onChange={handleNotExpandedChange()}
              >
                <EditIcon />
              </IconButton>
            </ RouterLink>
          </ExpansionPanelActions>
        </ExpansionPanel>
      )))}

      { loading && (
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardContent>
            <div className={classes.loadingContent}>
              <CircularProgress />
            </div>
          </CardContent>
        </Card>
      )}
     

      { (totalElements === 0 && !loading) && (
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardContent>
            <div className={classes.loadingContent}>
              <Typography variant="body1" >Nenhum registro encontrado!</Typography>
            </div>
          </CardContent>
        </Card>
      )}

      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
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
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >        
        <CardActions> 
          <RouterLink to="/fornecedor">
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
            >
        Cancelar
            </Button>
          </RouterLink >
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

PedidoTable.propTypes = {
  className: PropTypes.string
};

export default PedidoTable;
