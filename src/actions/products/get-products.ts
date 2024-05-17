import { AxiosError } from 'axios';
import { api } from '../../config/api/api';
import { ProductResponse } from '../../infrastructure/interfaces/products.responses';
import { handleErrorApi } from '../fetchError/handleErrorApi';

export const getProducts = async (): Promise<ProductResponse[]> => {
	try {
		const { data } = await api.get<ProductResponse[]>('/bp/products');

		return data;
	} catch (error) {
		handleErrorApi(error as AxiosError);
		console.log(error);
		throw new Error('Ups, algo salió mal');
	}
};
