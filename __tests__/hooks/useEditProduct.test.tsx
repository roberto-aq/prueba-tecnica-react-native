import { useEditProduct } from '../../src/presentation/hooks/product/useEditProduct';
import { api } from '../../src/config/api/api';
import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react-native';
import { act } from 'react-test-renderer';
import { PropsWithChildren } from 'react';

jest.mock('../../src/config/api/api');

const queryClient = new QueryClient();

const wrapper = ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>
		{children}
	</QueryClientProvider>
);

describe('useEditProduct', () => {
	it('should call api to edit product', async () => {
		const product = {
			id: '1',
			name: 'Test Product',
			description: 'Test Description',
			logo: 'test-logo.png',
			date_release: '2024-05-17',
			date_revision: '2025-05-17',
		};

		(api.put as jest.Mock).mockResolvedValueOnce({ data: product });

		const Component = () => {
			const { mutate } = useEditProduct();
			return (
				<button onClick={() => mutate(product)}>Edit Product</button>
			);
		};

		const { getByText } = render(<Component />, { wrapper });

		act(() => {
			getByText('Edit Product').props.onClick();
		});

		await waitFor(() => {
			expect(api.put).toHaveBeenCalledWith('/bp/products', product);
		});
	});
});
