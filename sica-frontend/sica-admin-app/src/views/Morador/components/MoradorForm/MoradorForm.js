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
  TextField,
} from '@material-ui/core';

import InputMask from 'react-input-mask'

import { Creators as actions } from './../../../../store/actions/morador';
import {  isEdit }  from './../../../../common/util';
import validation from './../../../../common/validationUtil';
import estados  from './../../../../common/UF';

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
  loadingContent:{
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center'
  }  
}));

const MoradorForm = props => {
  const { className, keyItem, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    id: '',   
    nome: '',
    idade: '',
    email: '',
    cidade: '',
    endereco: '',
    bairro: '',
    numero: '',
    telefone: '',
    uf: 'sel',
    idBarragem : 'sel'  
  });

  const UFs = estados;

  const [showErrors, setShowErrors] = useState(false);

  const dispatch = useDispatch();  
  useFetching(dispatch, actions.buscaDetailMorador(keyItem));
  const morador = useSelector( state  => state.morador.morador );
  const barragens = useSelector( state  => state.morador.barragens );
  const loading = useSelector( state  => state.morador.loading );
  
  useEffect(() => {
    if(isEdit(keyItem)){

      if(morador !== null && morador !== '' &&  morador !== undefined ){   

        let codBarragem = 
                    morador.barragem !== null && 
                    morador.barragem !== '' && 
                    morador.barragem !== undefined ? morador.barragem.id : 'sel'
      
        setValues({
          id:  morador.id || '',  
          nome: morador.nome || '',
          idade: morador.idade || '',
          email: morador.email || '',
          cidade: morador.cidade || '',
          endereco: morador.endereco || '',
          bairro: morador.bairro || '',
          numero: morador.numero || '',
          telefone: morador.telefone || '',
          uf:  morador.uf || 'sel',
          idBarragem : codBarragem,    
        });
        
      }
    }
  }, [morador, keyItem])


  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const handleSubmit = event => {
    event.preventDefault();
    if (validation.required(values.nome.trim()) 
      || validation.minLengthRequired(6, values.nome)
      || validation.email(values.email) 
      || validation.required(values.endereco.trim()) 
      || validation.required(values.bairro.trim())
      || validation.number(values.idade)
      || validation.number(values.numero)
      || values.idBarragem === 'sel'
      || values.uf === 'sel' 
      || validation.required(values.cidade.trim())
    ) {
      setShowErrors(true);
    } else {
      if(isEdit(keyItem)) {
        dispatch(actions.editMorador(values),[])
      }else{  
        dispatch(actions.insertMorador(values),[])
        setValues({  
          id: '',   
          nome: '',
          idade: '',
          email: '',
          cidade: '',
          endereco: '',
          bairro: '',
          numero: '',
          telefone: '',
          uf: 'sel',
          idBarragem : 'sel' 
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
          subheader={isEdit(keyItem) ? 'ALTERAÇÃO' : 'CADASTRO'}
          title="Morador"
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
              xs={10}
            >
              <TextField
                error={validation.minLengthRequired(6, values.nome) && showErrors}
                fullWidth
                helperText={showErrors && validation.minLengthRequired(6, values.nome)}
                label="Nome"
                margin="dense"
                name="nome"
                onChange={handleChange}
                required
                value={values.nome}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
            >
              <TextField
                error={validation.required(values.idade) && showErrors}
                fullWidth
                helperText={showErrors && validation.number(values.idade)}
                inputProps={{ min: '1', max: '200', step: '1' }}
                label="Idade"
                margin="dense"
                name="idade"
                onChange={handleChange}
                required
                type="number" 
                value={values.idade}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={9}
              xs={12}
            >
              <TextField
                error={validation.email(values.email) && showErrors}
                fullWidth
                helperText={showErrors && validation.email(values.email)}
                label="E-mail"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                type="email"
                value={values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                error={validation.required(values.endereco.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.endereco.trim())}
                label="Endereço"
                margin="dense"
                name="endereco"
                onChange={handleChange}
                required
                value={values.endereco}
                variant="outlined"
              />
            </Grid> 
            <Grid
              item
              xs={12}
            >
              <TextField
                error={validation.required(values.bairro.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.required(values.bairro.trim())}
                label="Bairro"
                margin="dense"
                name="bairro"
                onChange={handleChange}
                required
                value={values.bairro}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              sm={6}
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
              sm={6}
              xs={12}
            >
              <TextField
                error={values.uf === 'sel' && showErrors}
                fullWidth
                helperText={values.uf === 'sel' && showErrors && 'Por favor, selecione um UF.'}
                label="Estado"
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
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={validation.number(values.numero.trim()) && showErrors}
                fullWidth
                helperText={showErrors && validation.number(values.numero.trim())}
                inputProps={{ min: '1', max: '200', step: '1' }}
                label="Numero"
                margin="dense"
                name="numero"
                onChange={handleChange}
                required
                type="number"
                value={values.numero}
                variant="outlined" 
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >  
              <InputMask
                mask="(99) 99999-9999"
                onChange={handleChange}
                value={values.telefone}
              >
                {(inputProps) => 
                  <TextField
                    {...inputProps}
                    fullWidth
                    label="Telefone"
                    margin="dense"
                    name="telefone"
                    variant="outlined"
                  />}
              </InputMask>
            </Grid>

            
            <Grid
              item
              xs={12}
            >
              <TextField
                error={values.idBarragem === 'sel' && showErrors}
                fullWidth
                helperText={values.idBarragem === 'sel' && showErrors && 'Por favor, selecione uma Barragem.'}
                id="idBarragem"
                label="Barragem próxima da sua residência"
                margin="dense"
                name="idBarragem"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.idBarragem}
                variant="outlined"
              > 
                <option value="sel" >
                  Selecione
                </option>
                {barragens.map(option => (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.descricao}
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
            type="submit"
            variant="contained"
          >
            {isEdit(keyItem) ? 'Editar' : 'Salvar'}
          </Button>
          <RouterLink to="/morador">
            <Button
              className={classes.button}
              color="primary"
              disabled={loading}
              variant="contained"
            >
            Cancelar
            </Button>
          </RouterLink >
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

MoradorForm.propTypes = {
  className: PropTypes.string
};

export default MoradorForm;
