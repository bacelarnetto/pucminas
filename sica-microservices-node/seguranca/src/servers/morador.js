import api from './api';

import globalTypes from './../common/constants/GlobalTypes'

const getMoradoresByIdBarragem = async (idBarragem ) => { 
		api.defaults.headers.common['Authorization'] = 'node-job'
		const response = await api.get(globalTypes.url.BARRAGEM_MORADORES + idBarragem)
		return response.data 
}

export const MoradorService = {
  findMoradoresByIdBarragem: async idBarragem  =>  {
		try {
			return await getMoradoresByIdBarragem(idBarragem);
		} catch (error) {
			console.error("Erro ao buscar moradores da barragem " + idBarragem, error);
		}
	}
}
