import { useDeleteProduct } from '../../src/presentation/hooks/product/useDeleteProduct';
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

describe('useDeleteProduct', () => {
	it('should call api to delete product', async () => {
		const id = '1';

		(api.delete as jest.Mock).mockResolvedValueOnce({});

		const Component = () => {
			const { mutate } = useDeleteProduct();
			return (
				<button onClick={() => mutate(id)}>Delete Product</button>
			);
		};

		const { getByText } = render(<Component />, { wrapper });

		act(() => {
			getByText('Delete Product').props.onClick();
		});

		await waitFor(() => {
			expect(api.delete).toHaveBeenCalledWith('/bp/products', {
				params: { id },
			});
		});
	});
});
