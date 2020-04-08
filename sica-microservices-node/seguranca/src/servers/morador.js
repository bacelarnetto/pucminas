import api from './api';

import globalTypes from './../common/constants/GlobalTypes'
const { createHystrixCommands } = require('simplified-hystrixjs');

const getMoradoresByIdBarragem = async (idBarragem ) => { 
		api.defaults.headers.common['Authorization'] = 'node-job'
		const response = await api.get(globalTypes.url.BARRAGEM_MORADORES + idBarragem)
		return response.data 
}

const serviceCommand = createHystrixCommands(getMoradoresByIdBarragem, { name : 'AlertMoradoresNodeService'});
  
export const MoradorService = {
  findMoradoresByIdBarragem: async idBarragem  =>  {
		try {
			const moradores =  await serviceCommand.getMoradoresByIdBarragem(idBarragem);
			return moradores;
		} catch (error) {
				console.log("error in catch", error);
		}
	} 
	
}