import Queue from '../lib/Queue';
import { MoradorService as moradorService }  from './../../servers/morador'

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}

const taskAlert = async idBarragem => {
  let moradores = await moradorService.findMoradoresByIdBarragem(idBarragem)
  await taskAlertByMoradores(moradores) 
}


const taskAlertByMoradores = async moradores => {
  if(!isEmpty(moradores)){
    await moradores.map(item => {
        const morador = {
            name: item.nome,
            email: item.email,
            barragem: item.nomeBarragem
        }
        // Adicionar job RegistrationMail na fila
        Queue.add('AlertMail', { morador })
    })     
    Queue.add('PushNotification', { barragem : moradores[0].nomeBarragem })
  }  
}

const taskAlertPushNotification = async barragem => {
  Queue.add('PushNotification', { barragem : barragem.nome })
}

const taskAlertEmail = async  morador => {
  Queue.add('AlertMail', { morador })
}

module.exports = { taskAlert, taskAlertByMoradores, taskAlertPushNotification,  taskAlertEmail }