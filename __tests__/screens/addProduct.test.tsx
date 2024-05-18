import React from 'react';
import {
	render,
	fireEvent,
	waitFor,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import AddProductScreen from '../../src/presentation/screens/product/AddProductScreen';
import { useCreateProduct } from '../../src/presentation/hooks/product/useCreateProduct';

jest.mock('../../src/presentation/hooks/product/useCreateProduct');

const mockUseCreateProduct = useCreateProduct as jest.Mock;

describe('AddProductScreen', () => {
	beforeEach(() => {
		mockUseCreateProduct.mockReturnValue({
			mutate: jest.fn(),
			isPending: false,
			isSuccess: false,
			isError: false,
			error: null,
		});
	});

	it('should render correctly', () => {
		const { getByText, getByPlaceholderText } = render(
			<NavigationContainer>
				<AddProductScreen />
			</NavigationContainer>
		);

		expect(getByText('Formulario de Registro')).toBeTruthy();
		expect(getByPlaceholderText('')).toBeTruthy();
	});

	it('should call mutate on submit', async () => {
		const mutate = jest.fn();
		mockUseCreateProduct.mockReturnValue({
			mutate,
			isPending: false,
			isSuccess: false,
			isError: false,
			error: null,
		});

		const { getByText, getByPlaceholderText } = render(
			<NavigationContainer>
				<AddProductScreen />
			</NavigationContainer>
		);

		fireEvent.changeText(
			getByPlaceholderText('Nombre'),
			'Test Product'
		);
		fireEvent.press(getByText('Enviar'));

		await waitFor(() => {
			expect(mutate).toHaveBeenCalled();
		});
	});

	it('should show loading state when pending', () => {
		mockUseCreateProduct.mockReturnValue({
			mutate: jest.fn(),
			isPending: true,
			isSuccess: false,
			isError: false,
			error: null,
		});

		const { getByTestId } = render(
			<NavigationContainer>
				<AddProductScreen />
			</NavigationContainer>
		);

		expect(getByTestId('fullscreen-loader')).toBeTruthy();
	});
});
