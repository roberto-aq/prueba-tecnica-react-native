import {
	render,
	fireEvent,
	waitFor,
} from '@testing-library/react-native';
import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import ProductScreen from '../../src/presentation/screens/product/ProductScreen';
import { useDeleteProduct } from '../../src/presentation/hooks/product/useDeleteProduct';
import { RootStackParams } from '../../src/presentation/navigation/StackNavigator';

jest.mock('../../src/presentation/hooks/product/useDeleteProduct');
jest.mock('../../src/presentation/hooks/ui/useErrorHandler', () => ({
	__esModule: true,
	default: () => ({
		closeModal: jest.fn(),
		visible: false,
		setVisible: jest.fn(),
	}),
}));

const mockProduct = {
	id: '1',
	name: 'Test Product',
	description: 'Test Description',
	logo: 'test-logo.png',
	date_release: '2024-05-17T00:00:00.000+00:00',
	date_revision: '2025-05-17T00:00:00.000+00:00',
};

const mockUseDeleteProduct = useDeleteProduct as jest.Mock;

// Definición de la ruta mock
const mockRoute: RouteProp<RootStackParams, 'Product'> = {
	key: 'Product',
	name: 'Product',
	params: {
		product: mockProduct,
	},
};

describe('ProductScreen', () => {
	beforeEach(() => {
		mockUseDeleteProduct.mockReturnValue({
			isPending: false,
			mutate: jest.fn(),
			isError: false,
			isSuccess: false,
			error: null,
		});
	});

	it('should render correctly', () => {
		const { getByText } = render(
			<NavigationContainer>
				<ProductScreen route={mockRoute} navigation={{} as any} />
			</NavigationContainer>
		);

		expect(getByText('ID: 1')).toBeTruthy();
		expect(getByText('Test Product')).toBeTruthy();
		expect(getByText('Test Description')).toBeTruthy();
		expect(getByText('Editar')).toBeTruthy();
		expect(getByText('Eliminar')).toBeTruthy();
	});

	it('should navigate to EditProduct screen on Edit button press', () => {
		const navigation = { navigate: jest.fn() } as any;
		const { getByText } = render(
			<NavigationContainer>
				<ProductScreen route={mockRoute} navigation={navigation} />
			</NavigationContainer>
		);

		fireEvent.press(getByText('Editar'));
		expect(navigation.navigate).toHaveBeenCalledWith('EditProduct', {
			product: mockProduct,
		});
	});

	it('should show confirmation modal on Delete button press', () => {
		const { getByText, queryByText } = render(
			<NavigationContainer>
				<ProductScreen route={mockRoute} navigation={{} as any} />
			</NavigationContainer>
		);

		fireEvent.press(getByText('Eliminar'));
		expect(
			queryByText(
				`¿Estás seguro de eliminar el producto ${mockProduct.name}?`
			)
		).toBeTruthy();
	});

	it('should call mutate on delete confirmation', async () => {
		const mutate = jest.fn();
		mockUseDeleteProduct.mockReturnValue({
			isPending: false,
			mutate,
			isError: false,
			isSuccess: false,
			error: null,
		});

		const { getByText } = render(
			<NavigationContainer>
				<ProductScreen route={mockRoute} navigation={{} as any} />
			</NavigationContainer>
		);

		fireEvent.press(getByText('Eliminar'));
		fireEvent.press(getByText('Confirmar'));

		await waitFor(() => {
			expect(mutate).toHaveBeenCalledWith(mockProduct.id);
		});
	});

	it('should show loading state when deleting', () => {
		mockUseDeleteProduct.mockReturnValue({
			isPending: true,
			mutate: jest.fn(),
			isError: false,
			isSuccess: false,
			error: null,
		});

		const { getByTestId } = render(
			<NavigationContainer>
				<ProductScreen route={mockRoute} navigation={{} as any} />
			</NavigationContainer>
		);

		expect(getByTestId('product-list-skeleton')).toBeTruthy();
	});

	it('should show error alert when there is an error', async () => {
		mockUseDeleteProduct.mockReturnValue({
			isPending: false,
			mutate: jest.fn(),
			isError: true,
			isSuccess: false,
			error: { message: 'Error deleting product' },
		});

		const { getByText } = render(
			<NavigationContainer>
				<ProductScreen route={mockRoute} navigation={{} as any} />
			</NavigationContainer>
		);

		await waitFor(() => {
			expect(getByText('Error deleting product')).toBeTruthy();
		});
	});
});
