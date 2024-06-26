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
			renderItem={({ item, index }) => (
				<ProductItem
					product={item}
					style={
						index === 0
							? {
									borderTopLeftRadius: 6,
									borderTopEndRadius: 6,
									borderBottomWidth: products.length === 1 ? 1 : 0,
									borderRadius: products.length === 1 ? 6 : 0,
							  }
							: index === products.length - 1 && {
									borderBottomLeftRadius: 6,
									borderBottomEndRadius: 6,
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
