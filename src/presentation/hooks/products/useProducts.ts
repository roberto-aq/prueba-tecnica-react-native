import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../actions';

export const useProducts = () => {
	const { data: products = [], isLoading } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
	});

	return {
		products,
		isLoading,
	};
};
