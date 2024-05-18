import axios from 'axios';
import { handleErrorApi } from '../../src/actions/fetchError/handleErrorApi';
import { Product } from '../../src/presentation/types/Product';
import { EditProduct } from '../../src/actions';

jest.mock('axios');
jest.mock('../../src/actions/fetchError/handleErrorApi');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedHandleErrorApi = handleErrorApi as jest.MockedFunction<
	typeof handleErrorApi
>;

describe('editProduct', () => {
	const product: Product = {
		id: '123',
		name: 'Test Product',
		description: 'Test Description',
		logo: 'test-logo.png',
		date_release: '2024-05-17',
		date_revision: '2025-05-17',
	};

	it('should edit a product successfully', async () => {
		mockedAxios.put.mockResolvedValue({ data: product });

		const result = await EditProduct(product);

		expect(result).toEqual(product);
		expect(mockedAxios.put).toHaveBeenCalledWith(
			'/bp/products',
			product
		);
	});

	it('should handle errors', async () => {
		const error = new Error('Test Error');
		mockedAxios.put.mockRejectedValue(error);

		await expect(EditProduct(product)).rejects.toThrow(
			'Ups, algo salió mal'
		);
		expect(mockedHandleErrorApi).toHaveBeenCalledWith(error);
	});
});
