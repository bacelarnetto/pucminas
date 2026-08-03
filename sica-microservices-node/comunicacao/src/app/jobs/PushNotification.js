const sendPushNotification = async barragem => {
	await sendMessage(barragem)
}

export default {
	key: 'PushNotification',
	async handle({ data }) {
		const { barragem } = data;
		await sendPushNotification(barragem)
	}
}

var sendMessage = async barragem => {
	var restKey = process.env.ONE_SIGNAL_REST_KEY;
	var appID = process.env.ONE_SIGNAL_APP_ID;
	const response = await fetch('https://onesignal.com/api/v1/notifications', {
		method: 'POST',
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": "Basic " + restKey,
		},
		body: JSON.stringify({
			'app_id': appID,
			'headings': { en: 'Aviso de rompimento de barragem!!' },
			'subtitle': { en: 'Aviso de rompimento de barragem!!' },
			'contents': { en: `Por favor, Moradores que residem próximo da "Barragem ${barragem}", evacuar área imediatamente. Procurar regiões altas sem risco de sofrer inundação!` },
			'included_segments': ['All']
		})
	});

	if (!response.ok) {
		const body = await response.text();
		console.error('Error OneSignal:', response.status, body);
	} else {
		console.log(await response.json());
	}
}
