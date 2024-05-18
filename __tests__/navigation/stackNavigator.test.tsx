import { render, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from '../../src/presentation/navigation/StackNavigator';
import { ProductResponse } from '../../src/infrastructure/interfaces/products.responses';
import { Text } from 'react-native';

jest.mock('../../src/presentation/screens', () => ({
	HomeScreen: () => <Text>Home Screen</Text>,
	ProductScreen: () => <Text>Product Screen</Text>,
	AddProductScreen: () => <Text>Add Product Screen</Text>,
	EditProductScreen: () => <Text>Edit Product Screen</Text>,
}));

describe('StackNavigator', () => {
	it('renders HomeScreen by default', () => {
		const { getByText } = render(
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
		);
		expect(getByText('Home Screen')).toBeTruthy();
	});

	it('navigates to ProductScreen', () => {
		const product: ProductResponse = {
			id: '1',
			name: 'Test Product',
			description: 'Test Description',
			logo: 'test-logo.png',
			date_release: '2024-05-17',
			date_revision: '2025-05-17',
		};

		const { getByText } = render(
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
		);

		fireEvent.press(getByText('Home Screen'));

		// Simulate navigation action
		navigation.navigate('Product', { product });

		expect(getByText('Product Screen')).toBeTruthy();
	});

	it('navigates to AddProductScreen', () => {
		const { getByText } = render(
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
		);

		fireEvent.press(getByText('Home Screen'));

		// Simulate navigation action
		navigation.navigate('AddProduct');

		expect(getByText('Add Product Screen')).toBeTruthy();
	});

	it('navigates to EditProductScreen', () => {
		const product: ProductResponse = {
			id: '1',
			name: 'Test Product',
			description: 'Test Description',
			logo: 'test-logo.png',
			date_release: '2024-05-17',
			date_revision: '2025-05-17',
		};

		const { getByText } = render(
			<NavigationContainer>
				<StackNavigator />
			</NavigationContainer>
		);

		fireEvent.press(getByText('Home Screen'));

		// Simulate navigation action
		navigation.navigate('EditProduct', { product });

		expect(getByText('Edit Product Screen')).toBeTruthy();
	});
});
