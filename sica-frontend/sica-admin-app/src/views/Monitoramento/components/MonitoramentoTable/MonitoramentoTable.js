import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import { Link as  Redirect } from 'react-router-dom';

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
  Grid,
  CircularProgress,
} from '@material-ui/core';

import SearchIcon from '@material-ui/icons/Search';

import { Creators as actions } from './../../../../store/actions/monitoramento';

import LineChart from './../Chart/LineChart';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

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

const MonitoramentoTable = props => {
  const { className, keyBarragem , ...rest } = props;

  const classes = useStyles();

  const locale = 'pt-br'

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id'); 

  const [showErrors, setShowErrors] = useState(false);

  const [selectedDateStart, setSelectedDateStart] = useState(new Date());

  const handleDateChangeStart = date => {
    setSelectedDateStart(date);
  };

  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());

  const handleDateChangeEnd = date => {
    setSelectedDateEnd(date);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
    dispatch(actions.buscaDetailMonitoramento( keyBarragem ,  selectedDateStart, selectedDateEnd , page, rowsPerPage, order, orderBy),[])
  };
  
  const dispatch = useDispatch();
  useFetching(dispatch, actions.buscaDetailMonitoramento( keyBarragem , selectedDateStart, selectedDateEnd , page, rowsPerPage, order, orderBy));

  const monitoramentos = useSelector( state  => state.monitoramento.data );
  const listDates = useSelector( state  => state.monitoramento.listDates );
  const listVolumes = useSelector( state  => state.monitoramento.listVolumes );
  const listTemperaturas = useSelector( state  => state.monitoramento.listTemperaturas);
  const listMovimentacoes = useSelector( state  => state.monitoramento.listMovimentacoes );
  const listPressoes = useSelector( state  => state.monitoramento.listPressoes );
  const nomeBarragem = useSelector( state  => state.monitoramento.nomeBarragem );

  const totalElements = useSelector( state  => state.monitoramento.totalElements );
  const loading = useSelector( state  => state.monitoramento.loading );
  const erro = useSelector( state  => state.monitoramento.erro );
  const codigoErro = useSelector( state  => state.monitoramento.codigoErro );


  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
    dispatch(actions.buscaDetailMonitoramento( keyBarragem ,  selectedDateStart, selectedDateEnd , page, event.target.value, order, orderBy),[])
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';    
    dispatch(actions.buscaDetailMonitoramento( keyBarragem , selectedDateStart, selectedDateEnd , page, rowsPerPage, isAsc ? 'desc' : 'asc', property),[])
    let valorOrder =isAsc ? 'desc' : 'asc'
    setOrder(valorOrder);
    setOrderBy(property);
  }

  const handleSubmit = event => {
    event.preventDefault();
    event.preventDefault();
    if (!selectedDateStart || !selectedDateEnd) {
      setShowErrors(true);
    } else {
      dispatch(actions.buscaDetailMonitoramento( keyBarragem ,  selectedDateStart, selectedDateEnd , page, rowsPerPage, order, orderBy),[])
    }   
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

  const headCells = [
    { id: 'dataCadastro', numeric: false, disablePadding: false, label: 'Data' } ,
    { id: 'codigoCriticidade', numeric: false, disablePadding: false, label: 'Risco' } ,
    { id: 'movimentacao', numeric: false, disablePadding: false, label: 'Movimentação' } ,
    { id: 'pressao', numeric: false, disablePadding: false, label: 'Pressão' } ,
    { id: 'temperatura', numeric: false, disablePadding: false, label: 'Temperatura' } ,
    { id: 'volume', numeric: false, disablePadding: false, label: 'Volume' } ,
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
            title={`Monitoramento de Barragem - ${nomeBarragem}`}
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
            <MuiPickersUtilsProvider
                locale={locale}
                utils={MomentUtils}
              >
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <KeyboardDatePicker  
                    cancelLabel="Cancelar"
                    error={!selectedDateStart  && showErrors}            
                    format="DD/MM/YYYY"
                    fullWidth
                    helperText={!selectedDateStart && showErrors && 'Por favor, preencha a data.'}
                    id="date-start-picker-dialog" 
                    inputVariant="outlined"
                    KeyboardButtonProps={{ 'aria-label': 'change date', }}
                    label="Data de Inicio"
                    locale="pt-br"
                    margin="dense"
                    onChange={handleDateChangeStart}
                    value={selectedDateStart}
                  />
                </Grid>

                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <KeyboardDatePicker                        
                    cancelLabel="Cancelar"
                    error={!selectedDateEnd  && showErrors}                
                    disablePast
                    format="DD/MM/YYYY" 
                    fullWidth
                    helperText={!selectedDateEnd && showErrors && 'Por favor, preencha a data.'}
                    id="date-end-picker-dialog"
                    inputVariant="outlined"
                    KeyboardButtonProps={{ 'aria-label': 'change date', }}
                    label="Data Fim"
                    locale="pt-br"
                    margin="dense"
                    onChange={handleDateChangeEnd}
                    value={selectedDateEnd}
                  />
                </Grid>
              </MuiPickersUtilsProvider>  
              <Grid
                className={classes.actionSearchContent}
                item
                md={4}
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
                  { !loading && (monitoramentos.map(monitoramento => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={monitoramento.id}
                    > 
                      <TableCell>{monitoramento.dataCadastro}</TableCell>    
                      <TableCell 
                        style={{color: colorStatus(monitoramento.categoriaRisco.codigo), fontWeight: 'bold'}}
                      >{monitoramento.categoriaRisco.descricao}</TableCell>
                      <TableCell>{monitoramento.movimentacao}</TableCell>
                      <TableCell>{monitoramento.pressao}</TableCell>
                      <TableCell>{monitoramento.temperatura}</TableCell>
                      <TableCell>{monitoramento.volume}</TableCell>
                     
                    </TableRow>
                  )))}

                  { loading && (
                    <TableRow
                      className={classes.tableRow}
                      hover
                    >
                      <TableCell colSpan={5} >
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
                      <TableCell colSpan={5} >
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
      <br/>
      <Grid
          container
          spacing={12}
        >
          <Grid
            item
            xs={12}
            style={{paddingBottom: '20px'}}
          >     
            <LineChart  
              labels={listDates} 
              values={listVolumes}
              titleHeader="Volume da Barragem"
              titleChart={'Volume - '+ nomeBarragem}
              primaryColor="#8080ff"
              secondaryColor="#0000b3" />
          </Grid>   
          <Grid
            item
            xs={12}
            style={{paddingBottom: '20px'}}
          >     
            <LineChart  
              labels={listDates} 
              values={listPressoes}
              titleHeader="Pressão da Barragem"
              titleChart={'Pressão - '+ nomeBarragem}
              primaryColor="#ff6633"
              secondaryColor="#e63900" />
          </Grid>   
          <Grid
            item
            xs={12}
            style={{paddingBottom: '20px'}}
          >     
            <LineChart  
              labels={listDates} 
              values={listMovimentacoes} 
              titleHeader="Movimentação da Barragem"
              titleChart={'Movimentação - '+ nomeBarragem}
              primaryColor="#e6b800"
              secondaryColor="#b38f00"/>
          </Grid>  
          <Grid
            item
            xs={12}
          >     
            <LineChart  
              labels={listDates} 
              values={listTemperaturas}
              titleHeader="Temperatura da Barragem "
              titleChart={'Temperatura - '+ nomeBarragem}
              primaryColor="#00b3b3"
              secondaryColor="#008080" />
          </Grid>   
      </Grid>
      
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

MonitoramentoTable.propTypes = {
  className: PropTypes.string
};

export default MonitoramentoTable;
