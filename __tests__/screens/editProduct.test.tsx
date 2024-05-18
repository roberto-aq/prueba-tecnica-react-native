import React from 'react';
import {
	render,
	fireEvent,
	waitFor,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import EditProductScreen from '../../src/presentation/screens/product/EditProductScreen';
import { useEditProduct } from '../../src/presentation/hooks/product/useEditProduct';
import { useForm } from 'react-hook-form';
import { RootStackParams } from '../../src/presentation/navigation/StackNavigator';
import { RouteProp } from '@react-navigation/native';

jest.mock('../../src/presentation/hooks/product/useEditProduct');
jest.mock('react-hook-form');

const mockUseEditProduct = useEditProduct as jest.Mock;
const mockUseForm = useForm as jest.Mock;

describe('EditProductScreen', () => {
	beforeEach(() => {
		mockUseEditProduct.mockReturnValue({
			mutate: jest.fn(),
			isPending: false,
			isError: false,
			error: null,
		});

		mockUseForm.mockReturnValue({
			formState: { errors: {} },
			register: jest.fn(),
			setValue: jest.fn(),
			reset: jest.fn(),
			control: {},
			handleSubmit: jest.fn(),
			watch: jest.fn(),
		});
	});

	const product = {
		id: '1',
		name: 'Test Product',
		description: 'Test Description',
		logo: 'test-logo.png',
		date_release: '2024-05-17',
		date_revision: '2025-05-17',
	};

	const route: RouteProp<RootStackParams, 'EditProduct'> = {
		key: 'EditProductKey',
		name: 'EditProduct',
		params: { product },
	};

	const navigation = {
		navigate: jest.fn(),
		goBack: jest.fn(),
		// otras funciones de navegación que necesites mockear
	};

	it('should render correctly', () => {
		const { getByText, getByPlaceholderText } = render(
			<NavigationContainer>
				<EditProductScreen
					route={route}
					navigation={navigation as any}
				/>
			</NavigationContainer>
		);

		expect(getByText('Editar Producto')).toBeTruthy();
		expect(getByPlaceholderText('Nombre')).toBeTruthy();
		expect(getByPlaceholderText('Descripción')).toBeTruthy();
		expect(getByPlaceholderText('Logo')).toBeTruthy();
	});

	it('should call mutate on submit', async () => {
		const mutate = jest.fn();
		mockUseEditProduct.mockReturnValue({
			mutate,
			isPending: false,
			isError: false,
			error: null,
		});

		const { getByText, getByPlaceholderText } = render(
			<NavigationContainer>
				<EditProductScreen
					route={route}
					navigation={navigation as any}
				/>
			</NavigationContainer>
		);

		fireEvent.changeText(
			getByPlaceholderText('Nombre'),
			'Updated Product'
		);
		fireEvent.press(getByText('Guardar'));

		await waitFor(() => {
			expect(mutate).toHaveBeenCalled();
		});
	});

	it('should show loading state when pending', () => {
		mockUseEditProduct.mockReturnValue({
			mutate: jest.fn(),
			isPending: true,
			isError: false,
			error: null,
		});

		const { getByTestId } = render(
			<NavigationContainer>
				<EditProductScreen
					route={route}
					navigation={navigation as any}
				/>
			</NavigationContainer>
		);

		expect(getByTestId('fullscreen-loader')).toBeTruthy();
	});

	it('should show error alert when there is an error', async () => {
		const error = new Error('Error editing product');
		mockUseEditProduct.mockReturnValue({
			mutate: jest.fn(),
			isPending: false,
			isError: true,
			error,
		});

		const { getByText } = render(
			<NavigationContainer>
				<EditProductScreen
					route={route}
					navigation={navigation as any}
				/>
			</NavigationContainer>
		);

		await waitFor(() => {
			expect(getByText('Error editing product')).toBeTruthy();
		});
	});
});
