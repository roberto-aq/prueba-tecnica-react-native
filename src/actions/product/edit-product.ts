import { AxiosError } from 'axios';
import { api } from '../../config/api/api';
import { ProductResponse } from '../../infrastructure/interfaces/products.responses';
import { Product } from '../../presentation/types/Product';
import { handleErrorApi } from '../fetchError/handleErrorApi';

export const EditProduct = async (
	product: Product
): Promise<ProductResponse> => {
	try {
		const { data } = await api.put<ProductResponse>(
			`/bp/products`,
			product
		);

		return data;
	} catch (error) {
		handleErrorApi(error as AxiosError);
		console.log(error);
		throw new Error('Ups, algo salió mal');
	}
};
