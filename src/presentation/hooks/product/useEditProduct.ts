import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditProduct } from '../../../actions';
import {
	NavigationProp,
	useNavigation,
} from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const useEditProduct = () => {
	const queryClient = useQueryClient();
	const navigation = useNavigation<NavigationProp<RootStackParams>>();

	const { data, isPending, mutate, isSuccess, isError, error } =
		useMutation({
			mutationFn: EditProduct,
			onSuccess: data => {
				queryClient.invalidateQueries({
					queryKey: ['products'],
				});
				navigation.navigate('Product', { product: data });
			},
		});

	return {
		data,
		isPending,
		mutate,
		isSuccess,
		isError,
		error,
	};
};
