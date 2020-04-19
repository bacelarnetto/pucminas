var request = require('request');

export default {
	key: 'PushNotification',
	async handle({ data }) {
		const { barragem } = data;
		await sendMessage(barragem)
	}
}

const sendMessage = (barragem) => {
	var restKey = 'MjkwZmMyMTAtZGE2My00NDVhLTk5MWYtNGE5MGQ5NzkwZjUx';
	var appID = '67a57c27-b481-41ef-b754-e5c3cbe28cf1';
	request(
		{
			method:'POST',
			uri:'https://onesignal.com/api/v1/notifications',
			headers: {
				"Accept":"application/json",
				"Content-Type": "application/json",
				"Authorization": "Basic "+ restKey,				
			},
			json: true,
			body:{
				'app_id': appID,
				'headings': {en: 'Aviso de rompimento de barragem!!'},//titulo
				'subtitle': {en: 'Aviso de rompimento de barragem!!'},//subtitulo
				'contents': {en: `Por favor, Moradores que residem próximo da "Barragem ${barragem}", evacuar área imediatamente. Procurar regiões altas sem risco de sofrer inundação!`},//corpo
				// 'include_player_ids': Array.isArray(device) ? device : [device],
				'included_segments': ['All']
			}
		},
		function(error, response, body) {
			if(error){
				console.error('Error:', error);
			}
			if(!body.errors){
				console.log(body);
			}else{
			console.error('Error:', body.errors);
			}
		}
	);
}