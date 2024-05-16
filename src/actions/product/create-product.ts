import { api } from '../../config/api/api';
import { ProductResponse } from '../../infrastructure/interfaces/products.responses';
import { Product } from '../../presentation/types/Product';

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
	} catch (error) {
		console.log(error);
		throw new Error('Error creating product');
	}
};
