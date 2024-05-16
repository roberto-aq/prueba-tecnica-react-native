import {
	View,
	Text,
	TextInput,
	StyleSheet,
	FlatList,
} from 'react-native';
import MainLayout from '../../layout/MainLayout';
import { useProducts } from '../../hooks';
import { Button, ProductList } from '../../components';
import {
	NavigationProp,
	useNavigation,
} from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export default function HomeScreen() {
	const { products, isLoading } = useProducts();

	const navigation = useNavigation<NavigationProp<RootStackParams>>();

	return (
		<MainLayout>
			<View style={styles.containerTextInput}>
				<TextInput placeholder='Search..' style={styles.textInput} />
			</View>

			<ProductList products={products} />

			<Button
				text='Agregar'
				onPress={() => navigation.navigate('AddProduct')}
				color='#FFDD00'
			/>
		</MainLayout>
	);
}

const styles = StyleSheet.create({
	containerTextInput: {
		marginTop: 50,
		marginBottom: 30,
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
