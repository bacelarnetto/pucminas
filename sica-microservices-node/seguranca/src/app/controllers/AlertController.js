import SegurancaTask from './../tasks/SegurancaTask'

module.exports =  {
  
  async storeByBarragem(req, res) {
    const { id, nome } = req.body;
    const barragem = { id, nome };
    console.log("envio de e-mail via endpoint de Alerta!!!! Barragem: " + barragem.nome )
    SegurancaTask.taskAlert(barragem.id) 
    // Adicionar job RegistrationMail na fila
    //await Queue.add('AlertMail', { morador });
    return res.json(barragem);
  },

  async storeByMoradores(req, res) {
    const moradores = req.body;
    console.log("envio de e-mail via endpoint de Alerta por Moradores!!!" )
    SegurancaTask.taskAlertByMoradores(moradores) 
    return res.json(moradores);
  }

};