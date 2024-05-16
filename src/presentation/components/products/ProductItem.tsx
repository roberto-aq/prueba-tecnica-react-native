import {
	Pressable,
	StyleProp,
	StyleSheet,
	Text,
	View,
	ViewStyle,
} from 'react-native';
import {
	NavigationProp,
	useNavigation,
} from '@react-navigation/native';

import { RootStackParams } from '../../navigation/StackNavigator';
import { ProductResponse } from '../../../infrastructure/interfaces/products.responses';

import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
	product: ProductResponse;
	style: StyleProp<ViewStyle>;
}

export default function ProductItem({ product, style }: Props) {
	const navigation = useNavigation<NavigationProp<RootStackParams>>();

	return (
		<Pressable
			style={[styles.container, style]}
			onPress={() =>
				navigation.navigate('Product', { id: product.id })
			}
		>
			<View style={{ flex: 1, gap: 5 }}>
				<Text style={styles.title}>{product.name}</Text>
				<Text style={styles.subtitle}>{product.id}</Text>
			</View>

			<Ionicons name='chevron-forward-outline' size={22} color='#C1C1C3' />
		</Pressable>
	);
}
const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: '#F0F3F7',
		padding: 15,
		borderBottomWidth: 0,
		flexDirection: 'row',
		alignItems: 'center',
	},
	title: {
		textTransform: 'uppercase',
		fontWeight: '700',
		fontSize: 16,
	},
	subtitle: {
		fontSize: 12,
		color: '#333',
	},
});
