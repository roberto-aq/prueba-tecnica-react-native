import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../../actions';
import {
	NavigationProp,
	useNavigation,
} from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const useCreateProduct = () => {
	const queryClient = useQueryClient();
	const navigation = useNavigation<NavigationProp<RootStackParams>>();

	const { data, isPending, mutate, isSuccess, error, isError } =
		useMutation({
			mutationFn: createProduct,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ['products'] });
				navigation.navigate('Home');
			},
		});

	return {
		data,
		isPending,
		mutate,
		isSuccess,
		error,
		isError,
	};
};
