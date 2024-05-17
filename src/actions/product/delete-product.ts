import { AxiosError } from 'axios';
import { api } from '../../config/api/api';
import { handleErrorApi } from '../fetchError/handleErrorApi';

export const deleteProduct = async (id: string): Promise<void> => {
	try {
		await api.delete(`/bp/products`, {
			params: {
				id,
			},
		});
	} catch (error) {
		handleErrorApi(error as AxiosError);
		console.log(error);
		throw new Error('Ups, algo salió mal');
	}
};
