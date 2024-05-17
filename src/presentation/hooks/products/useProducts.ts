import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../actions';
import useErrorHandler from '../ui/useErrorHandler';

export const useProducts = () => {
	const {
		data: products = [],
		isLoading,
		error,
		isError,
	} = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
		staleTime: 1000 * 60 * 60,
	});

	return {
		products,
		isLoading,
		error,
		isError,
	};
};
