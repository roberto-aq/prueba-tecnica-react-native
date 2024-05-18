import { expect, jest, test } from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../../src/presentation/screens';
import { render, fireEvent } from '@testing-library/react-native';

// import '../../__mocks__/react-navigation.native';
// import { mockNavigate } from '../../__mocks__/react-navigation.native';

jest.mock(
	'../../src/presentation/hooks/products/useProducts',
	() => ({
		useProducts: () => ({
			products: [],
			isLoading: false,
			error: null,
			isError: false,
			clearError: jest.fn(),
		}),
	})
);

jest.mock(
	'../../src/presentation/hooks/search/useFilteredProducts',
	() => ({
		useFilteredProducts: (products: any[]) => ({
			filteredProducts: products,
			searchTerm: '',
			setSearchTerm: jest.fn(),
		}),
	})
);

describe('HomeScreen', () => {
	it('should render correctly', () => {
		const { getByPlaceholderText, getByText } = render(
			<NavigationContainer>
				<HomeScreen />
			</NavigationContainer>
		);

		expect(getByPlaceholderText('Search by name..')).toBeTruthy();
		expect(getByText('Agregar')).toBeTruthy();
	});

	it('should navigate to AddProduct screen on button press', () => {
		const { getByText } = render(
			<NavigationContainer>
				<HomeScreen />
			</NavigationContainer>
		);

		fireEvent.press(getByText('Agregar'));
	});
});
