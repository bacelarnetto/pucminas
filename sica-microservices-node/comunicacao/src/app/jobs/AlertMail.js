import Mail from '../lib/Mail';

export default {
  key: 'AlertMail',
  async handle({ data }) {
    const { morador } = data;

    await Mail.sendMail({
      from: 'Queue Test <queue@queuetest.com.br>',
      to: `${morador.name} <${morador.email}>`,
      subject: 'Aviso de rompimento de barragem!',
      html: `Alerta!! Por favor, ${morador.name}, evacuar area imediatamente,` + 
            'a barragem nas proximidades de sua residencia sofreu um rompimento. ' +
            'Procurar regiões altas sem risco de sofrer inundação'
    });
  },
};