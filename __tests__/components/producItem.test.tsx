import React from 'react';
import { render } from '@testing-library/react-native';
import ProductItem from '../../src/presentation/components/products/ProductItem';

const product = {
	id: '1',
	name: 'Product 1',
	description: 'Description 1',
	logo: 'logo1.png',
	date_release: '2024-05-17',
	date_revision: '2025-05-17',
};

describe('ProductItem', () => {
	it('should render correctly', () => {
		const { getByText } = render(<ProductItem product={product} />);
		expect(getByText('Product 1')).toBeTruthy();
		expect(getByText('Description 1')).toBeTruthy();
	});
});
