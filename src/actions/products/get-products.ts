import { api } from '../../config/api/api';
import { ProductResponse } from '../../infrastructure/interfaces/products.responses';

export const getProducts = async (): Promise<ProductResponse[]> => {
	try {
		const { data } = await api.get<ProductResponse[]>('/bp/products');

		return data;
	} catch (error) {
		console.log(error);
		throw new Error('Error getting products ');
	}
};
