import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link  as RouterLink , Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@material-ui/core';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';

import { Creators as actions } from './../../../../store/actions/manutencao';
import {  isEdit }  from './../../../../common/util';
import validation from './../../../../common/validationUtil';

import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

const useStyles = makeStyles(() => ({
  root: {},
  button:{
    color:'#FFFFFF',
    backgroundColor:'#235244',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#14352c'
    }
  },  
  textArea:{
    '&:focus': {
      //you want this to be the same as the backgroundColor above
      borderColor: '#235244',
      borderWidth: 3
  
    }
  },
  loadingContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  }  
}));

const ManutencaoForm = props => {
  const { className, keyManutencao, keyInsumo, ...rest } = props;
  const locale = 'pt-br'
  
  const [redirectList, setRedirectList] = useState(false);

  let finalizar = false;

  const classes = useStyles()
  
  const [values, setValues] = useState({
    id:  '',
    solicitante: '',
    descricao: '',
    tipo: 'sel',
    status:'sel', 
    responsavel: '',
    parecerResponsavel: '',  
  });


  const [selectedDateStart, setSelectedDateStart] = useState(new Date());

  const handleDateChangeStart = date => {
    setSelectedDateStart(date);
  };

  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());

  const handleDateChangeEnd = date => {
    setSelectedDateEnd(date);
  };

  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaDetailManutencao(keyManutencao, keyInsumo));
  const manutencao = useSelector( state  => state.manutencao.manutencao );
  const types = useSelector( state  => state.manutencao.typesManutencao );
  const insumo = useSelector( state  => state.manutencao.insumo );
  const status= useSelector( state  => state.manutencao.status );
  const loading = useSelector( state  => state.manutencao.loading );
  
  useEffect(() => {
    if(isEdit(keyManutencao)){
      if(manutencao !== null && manutencao !== '' &&  manutencao !== undefined ){             
        let codTipo = 
          manutencao.tipo !== null && 
          manutencao.tipo !== '' && 
          manutencao.tipo !== undefined ? manutencao.tipo.id : 'sel'

        let codStatus = 
          insumo.status !== null && 
          insumo.status !== '' && 
          insumo.status !== undefined ? insumo.status.codigo : 'sel'

        let dataInicio = 
          manutencao.dataInicio !== null && 
          manutencao.dataInicio !== '' && 
          manutencao.dataInicio !== undefined ? manutencao.dataInicio : new Date()
        
        let dataFim = 
          manutencao.dataFim !== null && 
          manutencao.dataFim !== '' && 
          manutencao.dataFim !== undefined ? manutencao.dataFim : new Date()
          
        setValues({
          id: manutencao.id || '',
          solicitante: manutencao.solicitante ||'', 
          descricao: manutencao.descricao ||'', 
          responsavel: manutencao.responsavel ||'', 
          parecerResponsavel: manutencao.parecerResponsavel ||'',
          tipo: codTipo,
          status: codStatus,  
        });
        
        const dateFormtStart = moment(dataInicio,'DD/MM/YYYY HH:mm').locale(locale);
        setSelectedDateStart(dateFormtStart)
        const dateFormtEnd = moment(dataFim,'DD/MM/YYYY HH:mm').locale(locale);
        setSelectedDateEnd(dateFormtEnd)
      }
    }
  }, [manutencao, types, insumo, status, keyManutencao])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });   
  };

  const handleFinalizar = isFinalizar => {
    finalizar = isFinalizar;
  }
  
  const handleSubmit = event => {
    event.preventDefault();
    if (validation.required(values.solicitante.trim())  
    || validation.required(values.descricao.trim())) {
      setShowErrors(true);
    } else {
      if(isEdit(keyManutencao)) {
        dispatch(actions.editManutencao(values, selectedDateStart, selectedDateEnd, insumo.id, finalizar),[])
        if(finalizar){
          dispatch(actions.buscaListManutencoes({valor:{solicitante: ''}} , 0, 10, 'asc', 'id'),[])
          setRedirectList(finalizar)
        }
      }else{  
        dispatch(actions.insertManutencao(values, keyInsumo),[])
        setValues({   
          id:  '',
          solicitante: '',
          descricao: '',
          tipo: 'sel',
          status:'sel', 
          responsavel: '',
          parecerResponsavel: '',           
        });        
      }
      setShowErrors(false);
    }
  }
  

  return (
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
          subheader={isEdit(keyManutencao) ? 'ALTERAÇÃO' : 'CADASTRO'}
          title="Manutencao"
        />
        <Divider />
        <CardContent>
          { loading && (    
            <div className={classes.loadingContent}>
              <CircularProgress />
            </div>
          )}
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="h6">Cod. Insumo: {insumo.id} &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp; Nome Insumo: {insumo.descricao}</Typography>  
              <br/>
              <Divider />
            </Grid>
           
            { isEdit(keyManutencao) &&
            <Grid
              item
              md={2}
              xs={12}
            >
              <TextField
                disabled
                fullWidth
                label="Cod."
                margin="dense"
                name="id"
                onChange={handleChange}
                required
                value={values.id}
                variant="outlined"
              />
            </Grid>}
            <Grid
              item
              md={10}
              xs={12}
            >
              <TextField
                error={validation.required(values.solicitante.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.solicitante.trim())}
                label="Solicitante"
                margin="dense"
                name="solicitante"
                onChange={handleChange}
                required
                value={values.solicitante}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="body2">Descrição do problema</Typography>              
              <TextareaAutosize
                aria-label="maximum height"               
                className={classes.textArea}
                label="Descrição"
                name="descricao"
                onChange={handleChange}
                placeholder="Descrição"
                style={{width:'100%', borderRadius: '5px', minHeight: '80px',maxHeight: '200px',
                  borderColor: validation.required(values.descricao.trim()) && showErrors && '#e53935'}}
                value={values.descricao}
              />
              { validation.required(values.descricao.trim()) && showErrors && (
                <Typography
                  style={{color:'#e53935'}}
                  variant="caption"
                >&nbsp;&nbsp;&nbsp;&nbsp;{showErrors && validation.required(values.descricao.trim())}</Typography>
              )}
            </Grid>

                        
          </Grid>
        </CardContent>
        { isEdit(keyManutencao) &&(
         
          <CardContent>
            <Divider />
            <br/>
            <Grid
              container
              spacing={3}
            >
              
              <Grid
                item
                md={4}
                xs={12}
              >
                <TextField
                  error={values.tipo === 'sel' && showErrors}
                  fullWidth
                  helperText={values.tipo === 'sel' && showErrors && 'Por favor, selecione um tipo.'}
                  label="Tipo"
                  margin="dense"
                  name="tipo"
                  onChange={handleChange}
                  required
                  // eslint-disable-next-line react/jsx-sort-props
                  select
                  SelectProps={{ native: true }}
                  value={values.tipo}
                  variant="outlined"
                >
                  <option
                    value="sel"
                  >
                  Selecione
                  </option>
                  {types.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.nome}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid
                item
                md={8}
                xs={12}
              >
                <TextField              
                  fullWidth
                  label="Responsável Técnico"
                  margin="dense"
                  name="responsavel"                 
                  onChange={handleChange}
                  value={values.responsavel}               
                  variant="outlined"
                />
              </Grid>
       
            
              <MuiPickersUtilsProvider
                locale={locale}
                utils={MomentUtils}
              >
                <Grid
                  item
                  md={4}
                  xs={12}
                >
                  <KeyboardDateTimePicker 
                    ampm={false}     
                    cancelLabel="Cancelar"            
                    disablePast
                    format="DD/MM/YYYY HH:mm"
                    fullWidth
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
                  <KeyboardDateTimePicker   
                    ampm={false}   
                    cancelLabel="Cancelar"                
                    disablePast
                    format="DD/MM/YYYY HH:mm" 
                    fullWidth
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
                item
                md={4}
                xs={12}
              >
                <TextField    
                  fullWidth
                  label="Status"
                  margin="dense"
                  name="status"
                  // eslint-disable-next-line react/jsx-sort-props
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.status}
                  variant="outlined"
                >
                  <option
                    value="sel"
                  >
                  Selecione
                  </option>
                  {status.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.nome}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <Typography variant="body2">Parecer do Responsável</Typography>              
                <TextareaAutosize
                  aria-label="maximum height"               
                  className={classes.textArea}
                  name="parecerResponsavel"
                  onChange={handleChange}
                  placeholder="Parecer do Responsável Técnico"
                  style={{width:'100%', borderRadius: '5px', minHeight: '80px',maxHeight: '200px'}}
                  value={values.parecerResponsavel}
                />
        
              </Grid>

              
            </Grid>

          
          
          </CardContent>
        )
        }
        <Divider />
        <CardActions>
          <Button
            className={classes.button}
            color="primary"
            type="submit"
            variant="contained"
          >
            {isEdit(keyManutencao) ? 'Editar' : 'Salvar'}
          </Button>
          
          <RouterLink to={isEdit(keyManutencao) ? '/manutencao' : '/insumo'}>
            <Button
              className={classes.button}
              color="primary"
              disabled={loading}
              variant="contained"
            >
            Cancelar
            </Button>
          </RouterLink >
          {isEdit(keyManutencao) && (
           
            <Button
              className={classes.button}
              color="primary"             
              onClick={() => handleFinalizar(true)}
              type="submit"
              variant="contained"
            >
              Finalizar
            </Button>
           
          )}

          { redirectList && (
            <Redirect to={'/manutencao'}/>
          )}

        </CardActions>
      </form>
     
    </Card>
  );
};

const useFetching = (dispatch, action) => {
  const array = [];
  useEffect(() => {
    dispatch(action);   
    /* eslint-disable-next-line */
  }, array)
}

ManutencaoForm.propTypes = {
  className: PropTypes.string
};

export default ManutencaoForm;
