import { api } from '../../config/api/api';

export const deleteProduct = async (id: string): Promise<void> => {
	try {
		await api.delete(`/bp/products`, {
			params: {
				id,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error deleting product');
	}
};
