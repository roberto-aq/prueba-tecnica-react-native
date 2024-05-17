import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';

import { RootStackParams } from '../../navigation/StackNavigator';
import { useEditProduct } from '../../hooks';
import { Product } from '../../types/Product';
import {
	AlertError,
	Button,
	DatePicker,
	FullScreenLoader,
	InputText,
} from '../../components';
import MainLayout from '../../layout/MainLayout';
import { productValidationRules } from '../../validations/productValidation';
import useErrorHandler from '../../hooks/ui/useErrorHandler';

interface Props
	extends StackScreenProps<RootStackParams, 'EditProduct'> {}

export default function EditProductScreen({ route }: Props) {
	const { product } = route.params;

	const {
		formState: { errors },
		register,
		setValue,
		reset,
		control,
		handleSubmit,
		watch,
	} = useForm<Product>({
		defaultValues: product,
	});

	const dateRelease = watch('date_release');

	const { mutate, isPending, isError, error } = useEditProduct();
	const { closeModal, visible, setVisible } = useErrorHandler();

	useEffect(() => {
		if (dateRelease) {
			const releaseDate = new Date(dateRelease);
			const revisionDate = new Date(
				releaseDate.setFullYear(releaseDate.getFullYear() + 1)
			);
			setValue(
				'date_revision',
				revisionDate.toISOString().split('T')[0]
			);
		}
	}, [dateRelease, setValue]);

	useEffect(() => {
		if (isError) {
			setVisible(true);
		}
	}, [isError]);

	const onSubmit = handleSubmit(data => {
		mutate({ ...data, id: product.id }); // Asegura que el ID no cambie
	});

	const onReset = () => {
		reset(product); // Restaura los valores originales del producto
	};

	if (isPending) return <FullScreenLoader />;

	return (
		<MainLayout>
			<Text style={styles.title}>Editar Producto</Text>

			<ScrollView style={styles.form}>
				<InputText
					control={control}
					name='id'
					rules={productValidationRules.id}
					errors={errors}
					label='ID'
					editable={false} // Desactiva la edición del campo ID
				/>
				<InputText
					control={control}
					name='name'
					rules={productValidationRules.name}
					errors={errors}
					label='Nombre'
				/>
				<InputText
					control={control}
					name='description'
					rules={productValidationRules.description}
					errors={errors}
					label='Descripción'
				/>
				<InputText
					control={control}
					name='logo'
					rules={productValidationRules.logo}
					errors={errors}
					label='Logo'
				/>
				<DatePicker
					control={control}
					name='date_release'
					rules={productValidationRules.date_release}
					errors={errors}
					label='Fecha de Lanzamiento'
					setValue={setValue}
					editable
				/>
				<DatePicker
					control={control}
					name='date_revision'
					rules={{}} // No se necesitan reglas para la fecha de revisión
					errors={errors}
					label='Fecha de Revisión'
					setValue={setValue}
					editable={false} // Hacer que este campo no sea editable
				/>
			</ScrollView>

			<View style={styles.containerButtons}>
				<Button text='Guardar' onPress={onSubmit} color='#FFDD00' />
				<Button text='Reiniciar' onPress={onReset} />
			</View>
			<AlertError
				visible={visible}
				message={error?.message || ''}
				onClose={closeModal}
			/>
		</MainLayout>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 35,
		fontWeight: '500',
		marginVertical: 20,
	},
	form: {
		marginVertical: 10,
	},
	containerButtons: {
		gap: 10,
	},
});
