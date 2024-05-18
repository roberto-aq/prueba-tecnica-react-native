import React from 'react';
import { render } from '@testing-library/react-native';
import ProductList from '../../src/presentation/components/products/ProductList';

const products = [
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
];

describe('ProductList', () => {
	it('should render correctly', () => {
		const { getByText } = render(<ProductList products={products} />);
		expect(getByText('Product 1')).toBeTruthy();
		expect(getByText('Product 2')).toBeTruthy();
	});
});
