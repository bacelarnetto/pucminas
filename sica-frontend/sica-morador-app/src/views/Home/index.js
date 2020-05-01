import React, {useState, useEffect} from 'react';
import {
  CssBaseline,
  Box,
  Typography,
  Divider,
  Grid,
  Container,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Copyright  from './../../components/Copyright'
import Header  from './../../components/Header'
import RowDatail from './../../components/RowDetail'

import {BarragemService as service} from './../../servers/barragem';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function Home() {
  const classes = useStyles();  
  const [barragem, setBarragem] = useState({});

  useEffect(() => {
    async function loadBarragem() {
      const email = await localStorage.getItem('moradorEmail');
      const response = await service.findBarragem(email);
      await setBarragem(response);
    }
    loadBarragem();
  }, []);

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
    <Container
      component="main"
      maxWidth="md"
    >
      <Header/>
      <CssBaseline />
      <br/>
      <div className={classes.paper}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <Typography
              className={classes.name}
              variant="h5"
            >
                  Seja bem vindo {localStorage.getItem('moradorEmail')}!
            </Typography>
          </Grid>
        </Grid>
        <br/>

        
        <Card
          style={{width:'100%'}}
        >
          <CardHeader
            subheader="Detalhe"
            title="Barragem"
          />
          <Divider />

          <CardContent>
            <br/>
            <RowDatail label='Nome da Barragem:' value={barragem.descricao} />
            <RowDatail label='Tipo:' value={!barragem.tipo ? '' : barragem.tipo.nome} />
            <RowDatail label='Minerio:' value={barragem.minerio} />
            <RowDatail label='Empresa:' value={barragem.empreendedor} />
            <RowDatail label='CNPJ Empresa:' value={barragem.cnpjEmpreendedor} />           
            <RowDatail label='Alimentado por Usina:' 
              value={barragem.alimentadoUsina === 'S'|| barragem.alimentadoUsina === 's'? 'SIM' : 'NÃO' } 
            />
            <RowDatail label='Vida Util(anos):' value={barragem.vidaUtilQuantidadeAnos} />
            <RowDatail label='Data da Construção:' value={barragem.dataConstrucao} />
            <RowDatail label='Categoria de Risco:' value={!barragem.categoriaRisco ? '' : barragem.categoriaRisco.descricao}  
              style={{color: colorStatus(!barragem.categoriaRisco ? '' : barragem.categoriaRisco.codigo), fontWeight: 'bold'}}
            />
            <RowDatail label='Dano Potencial Associado:' value={ !barragem.danoPotencialAssociado
              ? ''
              : barragem.danoPotencialAssociado.descricao}
             style={{color: colorStatus(!barragem.danoPotencialAssociado
              ? ''
              : barragem.danoPotencialAssociado.codigo), fontWeight: 'bold'}}
            />
            <RowDatail label='Situação Operacional:' value={!barragem.situacaoOperacional
              ? ''
              : barragem.situacaoOperacional.descricao} />
            <RowDatail label='Objetivo de Contenção:' value={!barragem.objetivoContencao
              ? ''
              : barragem.objetivoContencao.descricao} />

            <RowDatail label='Cidade:' value={barragem.cidade} />
            <RowDatail label='UF:' value={barragem.uf} />
            <RowDatail label='Latitude:' value={barragem.latitude} />
            <RowDatail label='Longitude:' value={barragem.longitude} />

          </CardContent>
        </Card>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
