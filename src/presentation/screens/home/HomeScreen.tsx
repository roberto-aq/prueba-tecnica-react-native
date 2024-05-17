import { View, TextInput, StyleSheet } from 'react-native';
import {
	NavigationProp,
	useNavigation,
} from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

import { useFilteredProducts, useProducts } from '../../hooks';
import MainLayout from '../../layout/MainLayout';

import {
	AlertError,
	Button,
	ProductList,
	ProductListSkeleton,
} from '../../components';
import useErrorHandler from '../../hooks/ui/useErrorHandler';
import { useEffect, useState } from 'react';

export default function HomeScreen() {
	const { products, isLoading, error, isError } = useProducts();
	const [visible, setVisible] = useState(false);

	const { filteredProducts, searchTerm, setSearchTerm } =
		useFilteredProducts(products);

	const navigation = useNavigation<NavigationProp<RootStackParams>>();

	useEffect(() => {
		if (isError) {
			setVisible(true);
		}
	}, [isError]);

	return (
		<MainLayout>
			{isLoading ? (
				<ProductListSkeleton />
			) : (
				<View style={{ flex: 1 }}>
					<View style={styles.containerTextInput}>
						<TextInput
							placeholder='Search by name..'
							style={styles.textInput}
							value={searchTerm}
							onChangeText={term => setSearchTerm(term)}
						/>
					</View>

					<ProductList products={filteredProducts} />

					<Button
						text='Agregar'
						onPress={() => navigation.navigate('AddProduct')}
						color='#FFDD00'
					/>
				</View>
			)}
			<AlertError
				visible={visible}
				message={error?.message || ''}
				onClose={() => setVisible(false)}
			/>
		</MainLayout>
	);
}

const styles = StyleSheet.create({
	containerTextInput: {
		marginTop: 50,
		marginBottom: 30,
		borderWidth: 1,
		borderColor: '#F0F3F7',
		paddingHorizontal: 15,
		height: 50,
		borderRadius: 6,
	},
	textInput: {
		width: '100%',
		height: '100%',
		fontSize: 16,
		fontWeight: '500',
	},
});
