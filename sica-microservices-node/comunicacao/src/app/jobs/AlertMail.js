import Mail from '../lib/Mail';

export default {
  key: 'AlertMail',
  async handle({ data }) {
    const { morador } = data;

    await Mail.sendMail({
      from: 'SCA Alerta <queue@queuetest.com.br>',
      to: `${morador.name} <${morador.email}>`,
      subject: `Atenção!! Aviso de rompimento da Barragem ${morador.barragem}!`,
      html: `Alerta de Perigo!! Por favor, ${morador.name}, evacuar área imediatamente. ` + 
            `A "Barragem ${morador.barragem}" que fica nas proximidades de sua residência sofreu um rompimento. ` +
            'Procurar regiões altas sem risco de sofrer inundação.'
    });
  },
};