import { useCreateProduct } from '../../src/presentation/hooks/product/useCreateProduct';
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

describe('useCreateProduct', () => {
	it('should call api to create product', async () => {
		const product = {
			id: '1',
			name: 'Test Product',
			description: 'Test Description',
			logo: 'test-logo.png',
			date_release: '2024-05-17',
			date_revision: '2025-05-17',
		};

		(api.post as jest.Mock).mockResolvedValueOnce({ data: product });
		(api.get as jest.Mock).mockResolvedValueOnce({ data: false }); // Mock the verification endpoint

		const Component = () => {
			const { mutate } = useCreateProduct();
			return (
				<button onClick={() => mutate(product)}>
					Create Product
				</button>
			);
		};

		const { getByText } = render(<Component />, { wrapper });

		act(() => {
			getByText('Create Product').props.onClick();
		});

		await waitFor(() => {
			expect(api.get).toHaveBeenCalledWith(
				'/bp/products/verification',
				{ params: { id: product.id } }
			);
			expect(api.post).toHaveBeenCalledWith('/bp/products', product);
		});
	});

	it('should throw an error if product already exists', async () => {
		const product = {
			id: '1',
			name: 'Test Product',
			description: 'Test Description',
			logo: 'test-logo.png',
			date_release: '2024-05-17',
			date_revision: '2025-05-17',
		};

		(api.get as jest.Mock).mockResolvedValueOnce({ data: true }); // Mock the verification endpoint to return true

		const Component = () => {
			const { mutate, isError, error } = useCreateProduct();
			return (
				<div>
					<button onClick={() => mutate(product)}>
						Create Product
					</button>
					{isError && <div>{error?.message || ''}</div>}
				</div>
			);
		};

		const { getByText, findByText } = render(<Component />, {
			wrapper,
		});

		act(() => {
			getByText('Create Product').props.onClick();
		});

		await findByText('El producto con ese ID ya existe');
	});
});
