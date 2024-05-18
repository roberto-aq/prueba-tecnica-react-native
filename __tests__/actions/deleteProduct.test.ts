import axios from 'axios';
import { deleteProduct } from '../../src/actions/product/delete-product';
import { handleErrorApi } from '../../src/actions/fetchError/handleErrorApi';

jest.mock('axios');
jest.mock('../../src/actions/fetchError/handleErrorApi');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedHandleErrorApi = handleErrorApi as jest.MockedFunction<
	typeof handleErrorApi
>;

describe('deleteProduct', () => {
	it('should delete a product successfully', async () => {
		mockedAxios.delete.mockResolvedValue({});

		await deleteProduct('123');

		expect(mockedAxios.delete).toHaveBeenCalledWith(`/bp/products`, {
			params: { id: '123' },
		});
	});

	it('should handle errors', async () => {
		const error = new Error('Test Error');
		mockedAxios.delete.mockRejectedValue(error);

		await expect(deleteProduct('123')).rejects.toThrow(
			'Ups, algo salió mal'
		);
		expect(mockedHandleErrorApi).toHaveBeenCalledWith(error);
	});
});
