import Queue from '../lib/Queue';
import { MoradorService as moradorService }  from './../../servers/morador'
import taskAlert from './../tasks/SegurancaTask'


module.exports =  {
  
  async store(req, res) {

    const { id, nome } = req.body;

    const barragem = {
      id,
      nome,
    };

    console.log("envio de e-mail via endpoint de barragem!!!! Barragem: " + barragem.nome )
    taskAlert(barragem.id)      

    // Adicionar job RegistrationMail na fila
    //await Queue.add('AlertMail', { morador });

    return res.json(barragem);
  }
};