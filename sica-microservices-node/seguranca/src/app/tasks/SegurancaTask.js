import Queue from '../lib/Queue';
import { MoradorService as moradorService }  from './../../servers/morador'

const taskAlert = async idBarragem => {
  const moradores = await moradorService.findMoradoresByIdBarragem(idBarragem)
  taskAlertByMoradores(moradores) 
}

const taskAlertByMoradores = async moradores => {
  await moradores.map(item => {
      const morador = {
          name: item.nome,
          email: item.email,
      }
      // Adicionar job RegistrationMail na fila
      Queue.add('AlertMail', { morador })
  })   
}

module.exports = { taskAlert, taskAlertByMoradores }