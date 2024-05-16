import {
	View,
	Text,
	TextInput,
	StyleSheet,
	FlatList,
} from 'react-native';
import MainLayout from '../../layout/MainLayout';
import { useProducts } from '../../hooks';
import { ProductList } from '../../components';

export default function HomeScreen() {
	const { products, isLoading } = useProducts();

	return (
		<MainLayout>
			<View style={styles.containerTextInput}>
				<TextInput placeholder='Search..' style={styles.textInput} />
			</View>

			<ProductList products={products} />
		</MainLayout>
	);
}

const styles = StyleSheet.create({
	containerTextInput: {
		marginVertical: 30,
		borderWidth: 2,
		borderColor: '#eee',
		paddingHorizontal: 15,
		height: 50,
		borderRadius: 5,

	},
	textInput: {
		width: '100%',
		height: '100%',
		fontSize: 16,
		fontWeight: 'bold',
	},
});
