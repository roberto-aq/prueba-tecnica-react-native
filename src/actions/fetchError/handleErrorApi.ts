import { AxiosError } from 'axios';

export const handleErrorApi = (error: AxiosError) => {
	if (error.response?.status === 400) {
		throw new Error('Falta el authorId');
	}
	if (error.response?.status === 206) {
		throw new Error('Faltan datos');
	}
	if (error.response?.status === 401) {
		throw new Error('El usuario no está autorizado');
	}
	if (error.response?.status === 404) {
		throw new Error('No existe ese producto');
	}
};
