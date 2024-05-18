import axios from 'axios';
import { getProducts } from '../../src/actions/products/get-products';
import { handleErrorApi } from '../../src/actions/fetchError/handleErrorApi';
import { ProductResponse } from '../../src/infrastructure/interfaces/products.responses';

jest.mock('axios');
jest.mock('../../src/actions/fetchError/handleErrorApi');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedHandleErrorApi = handleErrorApi as jest.MockedFunction<
	typeof handleErrorApi
>;

describe('getProducts', () => {
	const products: ProductResponse[] = [
		{
			id: '1',
			name: 'Product 1',
			description: 'Description 1',
			logo: 'logo1.png',
			date_release: '2024-05-17',
			date_revision: '2025-05-17',
		},
		{
			id: '2',
			name: 'Product 2',
			description: 'Description 2',
			logo: 'logo2.png',
			date_release: '2024-05-17',
			date_revision: '2025-05-17',
		},
	];

	it('should get products successfully', async () => {
		mockedAxios.get.mockResolvedValue({ data: products });

		const result = await getProducts();

		expect(result).toEqual(products);
		expect(mockedAxios.get).toHaveBeenCalledWith('/bp/products');
	});

	it('should handle errors', async () => {
		const error = new Error('Test Error');
		mockedAxios.get.mockRejectedValue(error);

		await expect(getProducts()).rejects.toThrow(
			'Ups, algo salió mal'
		);
		expect(mockedHandleErrorApi).toHaveBeenCalledWith(error);
	});
});
