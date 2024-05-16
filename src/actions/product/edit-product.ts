import { api } from '../../config/api/api';
import { ProductResponse } from '../../infrastructure/interfaces/products.responses';
import { Product } from '../../presentation/types/Product';

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
		console.log(error);
		throw new Error('Error creating product');
	}
};
