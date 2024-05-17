import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProduct } from '../../../actions/product/delete-product';
import {
	NavigationProp,
	useNavigation,
} from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const useDeleteProduct = () => {
	const queryClient = useQueryClient();
	const navigation = useNavigation<NavigationProp<RootStackParams>>();

	const { mutate, isPending, isSuccess, error, isError } =
		useMutation({
			mutationFn: deleteProduct,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['products'] });
				navigation.navigate('Home');
			},
		});

	return {
		mutate,
		isPending,
		isSuccess,
		error,
		isError,
	};
};
