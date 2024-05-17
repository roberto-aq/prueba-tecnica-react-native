import { AxiosError } from 'axios';
import { api } from '../../config/api/api';
import { ProductResponse } from '../../infrastructure/interfaces/products.responses';
import { Product } from '../../presentation/types/Product';
import { handleErrorApi } from '../fetchError/handleErrorApi';

export const createProduct = async (
	product: Product
): Promise<ProductResponse> => {
	try {
		const { data: isExist } = await api.get(
			`/bp/products/verification`,
			{
				params: {
					id: product.id,
				},
			}
		);

		if (isExist) throw new Error('Product already exists');

		const { data } = await api.post('/bp/products', product);

		return data;
	} catch (error: any) {
		handleErrorApi(error as AxiosError);
		if (error.message === 'Product already exists') {
			throw new Error('El producto con ese ID ya existe');
		}
		console.log(error);
		throw new Error('Ups, algo salió mal');
	}
};
