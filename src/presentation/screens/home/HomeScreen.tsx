import { View, Text } from 'react-native';
import MainLayout from '../../layout/MainLayout';
import { useProducts } from '../../hooks';

export default function HomeScreen() {
	const { products, isLoading } = useProducts();
	
	return (
		<MainLayout>
			<Text>HomeScreen</Text>
		</MainLayout>
	);
}
