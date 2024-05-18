import { handleErrorApi } from '../../src/actions/fetchError/handleErrorApi';
import { AxiosError } from 'axios';

describe('handleErrorApi', () => {
	it('should throw error for status 400', () => {
		const error = {
			response: {
				status: 400,
			},
		} as AxiosError;
		expect(() => handleErrorApi(error)).toThrow('Falta el authorId');
	});

	it('should throw error for status 206', () => {
		const error = {
			response: {
				status: 206,
			},
		} as AxiosError;
		expect(() => handleErrorApi(error)).toThrow('Faltan datos');
	});

	it('should throw error for status 401', () => {
		const error = {
			response: {
				status: 401,
			},
		} as AxiosError;
		expect(() => handleErrorApi(error)).toThrow(
			'El usuario no está autorizado'
		);
	});

	it('should throw error for status 404', () => {
		const error = {
			response: {
				status: 404,
			},
		} as AxiosError;
		expect(() => handleErrorApi(error)).toThrow(
			'No existe ese producto'
		);
	});
});
