import Queue from '../lib/Queue';
import { MoradorService as moradorService }  from './../../servers/morador'


module.exports =  {
  
  async store(req, res) {

    const { id, nome } = req.body;

    const barragem = {
      id,
      nome,
    };

    const moradores = await moradorService.findMoradoresByIdBarragem(barragem.id)

    await moradores.map(item => {
      const morador = {
        name: item.nome,
        email: item.email,
      }
      // Adicionar job RegistrationMail na fila
      Queue.add('AlertMail', { morador })
    })        

    // Adicionar job RegistrationMail na fila
    //await Queue.add('AlertMail', { morador });

    return res.json(barragem);
  }
};