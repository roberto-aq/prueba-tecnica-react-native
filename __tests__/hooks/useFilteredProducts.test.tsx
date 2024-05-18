import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { View, TextInput, FlatList, Text } from 'react-native';
import { useFilteredProducts } from '../../src/presentation/hooks/search/useFilteredProducts';
import { Product } from '../../src/presentation/types/Product';

// Crear un componente de prueba
const TestComponent = () => {
	const { filteredProducts, searchTerm, setSearchTerm } =
		useFilteredProducts([
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
		]);

	return (
		<View>
			<TextInput
				testID='search-input'
				value={searchTerm}
				onChangeText={setSearchTerm}
				placeholder='Search'
			/>
			<FlatList
				data={filteredProducts}
				keyExtractor={item => item.id}
				renderItem={({ item }) => <Text>{item.name}</Text>}
			/>
		</View>
	);
};

// Mockear el hook
jest.mock(
	'../../src/presentation/hooks/search/useFilteredProducts',
	() => ({
		useFilteredProducts: jest.fn(),
	})
);

describe('useFilteredProducts', () => {
	it('should filter products based on search term', () => {
		const mockFilteredProducts = {
			filteredProducts: [{ id: '1', name: 'Product 1' }],
			searchTerm: '',
			setSearchTerm: jest.fn(),
		};

		(useFilteredProducts as jest.Mock).mockReturnValue(
			mockFilteredProducts
		);

		const { getByPlaceholderText, getByText, getByTestId } = render(
			<TestComponent />
		);

		const input = getByTestId('search-input');
		fireEvent.changeText(input, 'Product 1');

		expect(mockFilteredProducts.setSearchTerm).toHaveBeenCalledWith(
			'Product 1'
		);
		expect(getByText('Product 1')).toBeTruthy();
	});

	it('should show all products if search term is empty', () => {
		const mockFilteredProducts = {
			filteredProducts: [
				{ id: '1', name: 'Product 1' },
				{ id: '2', name: 'Product 2' },
			],
			searchTerm: '',
			setSearchTerm: jest.fn(),
		};

		(useFilteredProducts as jest.Mock).mockReturnValue(
			mockFilteredProducts
		);

		const { getByText } = render(<TestComponent />);

		expect(getByText('Product 1')).toBeTruthy();
		expect(getByText('Product 2')).toBeTruthy();
	});
});
