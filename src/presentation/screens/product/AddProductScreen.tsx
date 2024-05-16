import { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';

import MainLayout from '../../layout/MainLayout';
import {
	Button,
	DatePicker,
	FullScreenLoader,
	InputText,
} from '../../components';

import { productValidationRules } from '../../validations/productValidation';
import { Product } from '../../types/Product';

import { useCreateProduct } from '../../hooks';

export default function AddProductScreen() {
	const {
		formState: { errors },
		register,
		setValue,
		reset,
		control,
		handleSubmit,
		watch,
	} = useForm<Product>();

	const { mutate, isPending } = useCreateProduct();

	const dateRelease = watch('date_release');

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

	const onSubmit = handleSubmit(data => {
		mutate(data);
	});

	const onReset = () => {
		reset({
			id: '',
			name: '',
			description: '',
			logo: '',
			date_release: '',
			date_revision: '',
		});
	};

	if (isPending) return <FullScreenLoader />;

	return (
		<MainLayout>
			<Text style={styles.title}>Formulario de Registro</Text>

			<ScrollView style={styles.form}>
				<InputText
					control={control}
					name='id'
					rules={productValidationRules.id}
					errors={errors}
					label='ID'
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
					rules={productValidationRules.date_revision}
					errors={errors}
					label='Fecha de Revisión'
					setValue={setValue}
				/>
			</ScrollView>

			<View style={styles.containerButtons}>
				<Button text='Enviar' onPress={onSubmit} color='#FFDD00' />
				<Button text='Reiniciar' onPress={onReset} />
			</View>
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

	containerInput: {
		marginHorizontal: 5,
		marginBottom: 15,
	},

	label: {
		fontSize: 14,
		fontWeight: '500',
		marginBottom: 10,
	},

	input: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		padding: 10,
	},

	containerButtons: {
		gap: 10,
	},
});
