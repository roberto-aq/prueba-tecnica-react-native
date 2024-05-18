import axios from 'axios';
import { createProduct } from '../../src/actions/product/create-product';
import { handleErrorApi } from '../../src/actions/fetchError/handleErrorApi';
import { Product } from '../../src/presentation/types/Product';

jest.mock('axios');
jest.mock('../../src/actions/fetchError/handleErrorApi');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedHandleErrorApi = handleErrorApi as jest.MockedFunction<
	typeof handleErrorApi
>;

describe('createProduct', () => {
	const product: Product = {
		id: '123',
		name: 'Test Product',
		description: 'Test Description',
		logo: 'test-logo.png',
		date_release: '2024-05-17',
		date_revision: '2025-05-17',
	};

	it('should create a product successfully', async () => {
		mockedAxios.get.mockResolvedValue({ data: false });
		mockedAxios.post.mockResolvedValue({ data: product });

		const result = await createProduct(product);

		expect(result).toEqual(product);
		expect(mockedAxios.get).toHaveBeenCalledWith(
			`/bp/products/verification`,
			{ params: { id: product.id } }
		);
		expect(mockedAxios.post).toHaveBeenCalledWith(
			'/bp/products',
			product
		);
	});

	it('should throw error if product already exists', async () => {
		mockedAxios.get.mockResolvedValue({ data: true });

		await expect(createProduct(product)).rejects.toThrow(
			'El producto con ese ID ya existe'
		);
	});

	it('should handle other errors', async () => {
		const error = new Error('Test Error');
		mockedAxios.get.mockRejectedValue(error);

		await expect(createProduct(product)).rejects.toThrow(
			'Ups, algo salió mal'
		);
		expect(mockedHandleErrorApi).toHaveBeenCalledWith(error);
	});
});
