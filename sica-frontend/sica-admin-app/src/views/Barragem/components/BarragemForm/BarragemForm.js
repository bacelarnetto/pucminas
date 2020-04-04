import React, { useState,  useEffect } from 'react';
import { useSelector,  useDispatch } from 'react-redux';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link  as RouterLink } from 'react-router-dom';
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
  TextField
} from '@material-ui/core';
import InputMask from 'react-input-mask'
import Backdrop from '@material-ui/core/Backdrop';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';


import { Creators as actions } from './../../../../store/actions/barragem';
import {  isEdit }  from './../../../../common/util';
import validation from './../../../../common/validationUtil';
import estados  from './../../../../common/UF';

import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');

const useStyles = makeStyles(theme => ({
  root: {},
  button:{
    color:'#FFFFFF',
    backgroundColor:'#235244',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#14352c'
    }
  },  
  loadingContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  loadingBlock:{
    zIndex: theme.zIndex.drawer + 2,
  }
}));

const BarragemForm = props => {
  const { className, keyItem, ...rest } = props;

  const locale = 'pt-br'
  const classes = useStyles();
  const UFs = estados;

  const [values, setValues] = useState({
    id:  '',
    descricao: '',
    empreendedor: '',
    cnpjEmpreendedor: '',
    minerio: '',
    tipo: 'sel',
    alimentadoUsina: 'S',
    codigoCategoriaRisco: 'sel',
    codigoDanoPotencial: 'sel',
    codigoObjetivoContencao: 'sel',
    codigoSituacaoOperacional: 'sel', 
    cidade: '',
    uf: 'sel',
    latitude: '',
    longitude: '',
    vidaUtilQuantidadeAnos: '',
  });

 
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaDetailBarragem(keyItem));
  const barragem = useSelector( state  => state.barragem.barragem );
  const types = useSelector( state  => state.barragem.types );
  const categoriasRisco = useSelector( state  => state.barragem.categoriasRisco );
  const danosPotenciais = useSelector( state  => state.barragem.danosPotenciais );
  const situacoesOperacionais = useSelector( state  => state.barragem.situacoesOperacionais );
  const objetivosContencao = useSelector( state  => state.barragem.objetivosContencao );
 
  const loading = useSelector( state  => state.barragem.loading );
  
  useEffect(() => {
    if(isEdit(keyItem)){
      if(barragem !== null && barragem !== '' &&  barragem !== undefined ){
        let codTipo = 
          barragem.tipo !== null && 
          barragem.tipo !== '' && 
          barragem.tipo !== undefined ? barragem.tipo.id : 'sel'

        setValues({
          id: barragem.id || '',
          descricao: barragem.descricao ||'',
          empreendedor: barragem.empreendedor ||'',
          cnpjEmpreendedor: barragem.cnpjEmpreendedor||'',
          minerio: barragem.minerio||'',
          tipo: codTipo,
          alimentadoUsina: barragem.alimentadoUsina||'',
          codigoCategoriaRisco: barragem.codigoCategoriaRisco||'sel',
          codigoDanoPotencial: barragem.codigoDanoPotencial||'sel',
          codigoObjetivoContencao: barragem.codigoObjetivoContencao||'sel',
          codigoSituacaoOperacional: barragem.codigoSituacaoOperacional||'sel', 
          cidade: barragem.cidade || '',
          uf: barragem.uf || 'sel',
          latitude: barragem.latitude ||'',
          longitude: barragem.longitude||'',
          vidaUtilQuantidadeAnos: barragem.vidaUtilQuantidadeAnos || '',
        });
        const dateFormt = moment(barragem.dataConstrucao,'DD/MM/YYYY').locale(locale);
        setSelectedDate(dateFormt)
      }
    }
  }, [barragem, types, keyItem])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (validation.minLengthRequired(6, values.descricao.trim()
        || validation.required(values.empreendedor.trim())
        || validation.required(values.cnpjEmpreendedor.trim()) 
        || validation.required(values.minerio.trim())    
        || validation.required(values.vidaUtilQuantidadeAnos))  
        || validation.required(values.latitude.trim())    
        || validation.required(values.longitude.trim())        
        || validation.required(values.cidade.trim()) 
        || values.tipo === 'sel'
        || values.codigoCategoriaRisco === 'sel'
        || values.codigoDanoPotencial === 'sel'
        || values.codigoObjetivoContencao === 'sel'
        || values.codigoSituacaoOperacional === 'sel'
        || values.tipo === 'sel'
        || values.uf === 'sel'
        || !selectedDate) {
      setShowErrors(true);
    } else {
      if(isEdit(keyItem)) {
        dispatch(actions.editBarragem(values, selectedDate),[])
      }else{
        dispatch(actions.insertBarragem(values, selectedDate),[])
        setValues({
          id:  '',
          descricao: '',
          empreendedor: '',
          cnpjEmpreendedor: '',
          minerio: '',
          tipo: 'sel',
          alimentadoUsina: 'S',
          codigoCategoriaRisco: 'sel',
          codigoDanoPotencial: 'sel',
          codigoObjetivoContencao: 'sel',
          codigoSituacaoOperacional: 'sel', 
          cidade: '',
          uf: 'sel',
          latitude: '',
          longitude: '',
          vidaUtilQuantidadeAnos: '',
        });        
      }
      setShowErrors(false);
    }
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
            subheader={isEdit(keyItem) ? 'ALTERAÇÃO' : 'CADASTRO'}
            title="Barragem" 
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
              { isEdit(keyItem) &&
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
                md={8}
                xs={12}
              >
                <TextField
                  error={validation.minLengthRequired(6, values.descricao.trim()) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.minLengthRequired(6, values.descricao.trim())}
                  label="Nome"
                  margin="dense"
                  name="descricao"
                  onChange={handleChange}
                  required
                  value={values.descricao}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={7}
                xs={12}
              >
                <TextField
                  error={validation.required(values.empreendedor.trim()) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.empreendedor.trim())}
                  label="Empreendedor"
                  margin="dense"
                  name="empreendedor"
                  onChange={handleChange}
                  required
                  value={values.empreendedor}
                  variant="outlined"
                />
              </Grid>   
                         
              <Grid
                item
                md={5}
                xs={12}
              >               
                <InputMask
                  mask="999.999.999/9999-99"
                  onChange={handleChange}
                  value={values.cnpjEmpreendedor}
                >
                  {(inputProps) => 
                    <TextField
                      {...inputProps}
                      error={validation.required(values.cnpjEmpreendedor) && showErrors}
                      fullWidth
                      helperText={showErrors && validation.required(values.cnpjEmpreendedor)}
                      label="CNPJ/Empreendedor"
                      margin="dense"
                      name="cnpjEmpreendedor"                 
                      required                  
                      variant="outlined"
                    />}
                </InputMask>
              </Grid>  

              <Grid
                item
                md={7}
                xs={12}
              >
                <TextField
                  error={validation.required(values.minerio.trim()) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.minerio.trim())}
                  label="Minerio"
                  margin="dense"
                  name="minerio"
                  onChange={handleChange}
                  required
                  value={values.minerio}
                  variant="outlined"
                />
              </Grid> 

              <Grid
                item
                md={5}
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
                md={3}
                xs={12}
              >
                <TextField
                  error={validation.required(values.vidaUtilQuantidadeAnos) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.vidaUtilQuantidadeAnos)}
                  inputProps={{ min: '1', max: '10000', step: '1' }}
                  label="Vida Útil(anos)"
                  margin="dense"
                  name="vidaUtilQuantidadeAnos"
                  onChange={handleChange}
                  required
                  type="number" 
                  value={values.vidaUtilQuantidadeAnos}
                  variant="outlined"
                />
              </Grid>

              <MuiPickersUtilsProvider
                locale={locale}
                utils={MomentUtils}
              >
                <Grid
                  item
                  md={3}
                  xs={12}
                >
                  <KeyboardDatePicker
                    cancelLabel="Cancelar"
                    error={!selectedDate  && showErrors}
                    format="DD/MM/YYYY"
                    fullWidth
                    helperText={!selectedDate && showErrors && 'Por favor, preencha a data.'}
                    id="date-picker-dialog" 
                    inputVariant="outlined"
                    KeyboardButtonProps={{ 'aria-label': 'change date', }}
                    label="Data de Construção"
                    locale="pt-br"
                    margin="dense"
                    onChange={handleDateChange}
                    value={selectedDate}
                  />
                </Grid>
              </MuiPickersUtilsProvider>

              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  error={values.codigoSituacaoOperacional === 'sel' && showErrors}
                  fullWidth
                  helperText={values.codigoSituacaoOperacional === 'sel' && showErrors && 'Por favor, selecione um item.'}
                  label="Situacão Operacional"
                  margin="dense"
                  name="codigoSituacaoOperacional"
                  onChange={handleChange}
                  required
                  // eslint-disable-next-line react/jsx-sort-props
                  select
                  SelectProps={{ native: true }}
                  value={values.codigoSituacaoOperacional}
                  variant="outlined"
                >
                  <option
                    value="sel"
                  >
                  Selecione
                  </option>
                  {situacoesOperacionais.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.descricao}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  error={values.codigoObjetivoContencao === 'sel' && showErrors}
                  fullWidth
                  helperText={values.codigoObjetivoContencao === 'sel' && showErrors && 'Por favor, selecione um item.'}
                  label="Objetivo de Contencão"
                  margin="dense"
                  name="codigoObjetivoContencao"
                  onChange={handleChange}
                  required
                  // eslint-disable-next-line react/jsx-sort-props
                  select
                  SelectProps={{ native: true }}
                  value={values.codigoObjetivoContencao}
                  variant="outlined"
                >
                  <option
                    value="sel"
                  >
                  Selecione
                  </option>
                  {objetivosContencao.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.descricao}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid
                item
                md={3}
                xs={12}
              >              
                <FormControl component="fieldset">
                  <FormLabel component="legend">Alimentado por Usina</FormLabel>
                  <RadioGroup
                    aria-label="position"
                    name="alimentadoUsina"
                    onChange={handleChange}
                    row
                    value={values.alimentadoUsina}
                  >
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Sim"
                      labelPlacement="end"
                      value="S"
                    />
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Não"
                      labelPlacement="end"
                      value="N"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  error={values.codigoCategoriaRisco === 'sel' && showErrors}
                  fullWidth
                  helperText={values.codigoCategoriaRisco === 'sel' && showErrors && 'Por favor, selecione um item.'}
                  label="Categoria de Risco"
                  margin="dense"
                  name="codigoCategoriaRisco"
                  onChange={handleChange}
                  required
                  // eslint-disable-next-line react/jsx-sort-props
                  select
                  SelectProps={{ native: true }}
                  value={values.codigoCategoriaRisco}
                  variant="outlined"
                >
                  <option
                    value="sel"
                  >
                  Selecione
                  </option>
                  {categoriasRisco.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.descricao}
                    </option>
                  ))}
                </TextField>
              </Grid>

              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  error={values.codigoDanoPotencial === 'sel' && showErrors}
                  fullWidth
                  helperText={values.codigoDanoPotencial === 'sel' && showErrors && 'Por favor, selecione um item.'}
                  label="Danos Potenciais"
                  margin="dense"
                  name="codigoDanoPotencial"
                  onChange={handleChange}
                  required
                  // eslint-disable-next-line react/jsx-sort-props
                  select
                  SelectProps={{ native: true }}
                  value={values.codigoDanoPotencial}
                  variant="outlined"
                >
                  <option
                    value="sel"
                  >
                  Selecione
                  </option>
                  {danosPotenciais.map(option => (
                    <option
                      key={option.id}
                      value={option.id}
                    >
                      {option.descricao}
                    </option>
                  ))}
                </TextField>
              </Grid>

             
              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  error={validation.required(values.latitude.trim()) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.latitude.trim())}
                  inputProps={{  step: '0.0000001' }}
                  label="Latitude"
                  margin="dense"
                  name="latitude"
                  onChange={handleChange}
                  required
                  type="number" 
                  value={values.latitude}
                  variant="outlined"
                />
              </Grid>

              <Grid
                item
                md={3}
                xs={12}
              >
                <TextField
                  error={validation.required(values.longitude.trim()) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.longitude.trim())}
                  inputProps={{  step: '0.0000001' }}
                  label="Longitude"
                  margin="dense"
                  name="longitude"
                  onChange={handleChange}
                  required
                  type="number" 
                  value={values.longitude}
                  variant="outlined"
                />
              </Grid>
              

              


              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  error={validation.required(values.cidade.trim()) && showErrors}
                  fullWidth
                  helperText={showErrors && validation.required(values.cidade.trim())}
                  label="Cidade"
                  margin="dense"
                  name="cidade"
                  onChange={handleChange}
                  required
                  value={values.cidade}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={3}
                xs={12}
              >  
                <TextField
                  error={values.uf === 'sel' && showErrors}
                  fullWidth
                  helperText={values.uf === 'sel' && showErrors && 'Por favor, selecione um UF.'}
                  label="UF"
                  margin="dense"
                  name="uf"
                  onChange={handleChange}
                  required
                  // eslint-disable-next-line react/jsx-sort-props
                  select
                  SelectProps={{ native: true }}
                  value={values.uf}
                  variant="outlined"
                >
                  <option
                    value="sel"
                  >
                  Selecione
                  </option>
                  {UFs.map(option => (
                    <option
                      key={option.key}
                      value={option.key}
                    >
                      {option.value}
                    </option>
                  ))}
                </TextField>

              </Grid>

              

            </Grid>
      
            
          </CardContent>
          <Divider />
          <CardActions>
            <Button
              className={classes.button}
              color="primary"
              disabled={loading}
              type="submit"
              variant="contained"
            >
              {isEdit(keyItem) ? 'Editar' : 'Salvar'}
            </Button>
            <RouterLink to="/barragem">
              <Button
                className={classes.button}
                color="primary"
                variant="contained"
              >
            Cancelar
              </Button>
            </RouterLink >
          </CardActions>
        </form>
      </Card>

      <Backdrop
        className={classes.backdrop}
        open={loading}
      >
        <Card className={classes.loadingBlock}>
          <CardContent>
            <CircularProgress color="inherit" />
          </CardContent>        
        </Card>
      </Backdrop>
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

BarragemForm.propTypes = {
  className: PropTypes.string
};

export default BarragemForm;
