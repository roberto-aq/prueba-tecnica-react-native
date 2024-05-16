import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ProductResponse } from '../../../infrastructure/interfaces/products.responses';
import ProductItem from './ProductItem';

interface Props {
	products: ProductResponse[];
}

export default function ProductList({ products }: Props) {
	return (
		<FlatList
			data={products}
			keyExtractor={item => item.id}
			renderItem={({ item, index, separators }) => (
				<ProductItem
					product={item}
					style={
						index === 0
							? {
									borderTopLeftRadius: 10,
									borderTopEndRadius: 10,
							  }
							: index === products.length - 1 && {
									borderBottomLeftRadius: 10,
									borderBottomEndRadius: 10,
									borderBottomWidth: 1,
							  }
					}
				/>
			)}
			style={{ marginBottom: 60 }}
			showsVerticalScrollIndicator={false}
		/>
	);
}
const styles = StyleSheet.create({});
