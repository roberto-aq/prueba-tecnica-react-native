import { api } from '../../src/config/api/api';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react-native';
import { useProducts } from '../../src/presentation/hooks';
import { PropsWithChildren } from 'react';

jest.mock('../../src/config/api/api');

const queryClient = new QueryClient();

const wrapper = ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		{children}
	</QueryClientProvider>
);

describe('useGetProducts', () => {
	it('should call api to get products', async () => {
		const products = [
			{
				id: '1',
				name: 'Test Product 1',
				description: 'Test Description 1',
				logo: 'test-logo1.png',
				date_release: '2024-05-17',
				date_revision: '2025-05-17',
			},
			{
				id: '2',
				name: 'Test Product 2',
				description: 'Test Description 2',
				logo: 'test-logo2.png',
				date_release: '2024-06-17',
				date_revision: '2025-06-17',
			},
		];

		(api.get as jest.Mock).mockResolvedValueOnce({ data: products });

		const Component = () => {
			const { products } = useProducts();
			return products ? (
				<div>{products.length} products loaded</div>
			) : null;
		};

		const { getByText } = render(<Component />, { wrapper });

		await waitFor(() => {
			expect(api.get).toHaveBeenCalledWith('/bp/products');
			expect(getByText('2 products loaded')).toBeTruthy();
		});
	});
});
