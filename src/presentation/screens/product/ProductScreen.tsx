import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

import MainLayout from '../../layout/MainLayout';
import {
	AlertError,
	Button,
	ModalConfirmationDelete,
	ProductListSkeleton,
	Row,
} from '../../components';
import { Formatter } from '../../helpers/formatter';
import { useDeleteProduct } from '../../hooks';
import useErrorHandler from '../../hooks/ui/useErrorHandler';

interface Props
	extends StackScreenProps<RootStackParams, 'Product'> {}

export default function ProductScreen({ route, navigation }: Props) {
	const { product } = route.params;
	const [modalVisible, setModalVisible] = useState(false);

	const { isPending, mutate, isError, isSuccess, error } =
		useDeleteProduct();
	const { closeModal, visible, setVisible } = useErrorHandler();

	const handleDelete = () => {
		mutate(product.id);
		setModalVisible(false);
	};

	useEffect(() => {
		if (isError) {
			setVisible(true);
		}
	}, [isError]);

	if (isPending)
		return (
			<MainLayout>
				<ProductListSkeleton />
			</MainLayout>
		);

	return (
		<MainLayout>
			<View style={{ flex: 1 }}>
				<View style={styles.containerHeader}>
					<Text style={styles.title}>ID: {product.id}</Text>
					<Text style={styles.subtitle}>Información extra</Text>
				</View>

				<View style={styles.containerInfo}>
					<Row title='Nombre' info={product.name} />
					<Row title='Descripción' info={product.description} />
					<Row title='Logo' info={product.logo} isLogo />
					<Row
						title='Fecha liberación'
						info={Formatter.formatDate(product.date_release)}
					/>
					<Row
						title='Fecha revisión'
						info={Formatter.formatDate(product.date_revision)}
					/>
				</View>
			</View>

			<View style={{ gap: 12 }}>
				<Button
					text='Editar'
					onPress={() =>
						navigation.navigate('EditProduct', {
							product,
						})
					}
				/>
				<Button
					text='Eliminar'
					onPress={() => setModalVisible(true)}
					color='#D50707'
					textColor='#fff'
				/>
			</View>

			<ModalConfirmationDelete
				visible={modalVisible}
				onConfirm={handleDelete}
				onCancel={() => setModalVisible(false)}
				productName={product.name}
			/>

			<AlertError
				visible={visible}
				message={error?.message || ''}
				onClose={closeModal}
			/>
		</MainLayout>
	);
}

const styles = StyleSheet.create({
	containerHeader: {
		marginVertical: 50,
	},

	title: {
		fontSize: 36,
		fontWeight: '700',
	},

	subtitle: {
		fontSize: 16,
		color: '#888',
		fontWeight: '500',
	},

	containerInfo: {
		paddingHorizontal: 10,
		gap: 20,
	},
});
