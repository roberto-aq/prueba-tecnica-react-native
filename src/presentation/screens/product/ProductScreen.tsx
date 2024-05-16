import { View, Text, StyleSheet } from 'react-native';
import MainLayout from '../../layout/MainLayout';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { Button, Row } from '../../components';
import { Formatter } from '../../helpers/formatter';

interface Props
	extends StackScreenProps<RootStackParams, 'Product'> {}

export default function ProductScreen({ route, navigation }: Props) {
	const { product } = route.params;

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
					onPress={() => {}}
					color='#D50707'
					textColor='#fff'
				/>
			</View>
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
