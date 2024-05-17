import { StyleSheet, View } from 'react-native';
import Skeleton from './Skeleton';

export default function ProductListSkeleton() {
	return (
		<View style={styles.container}>
			<View style={styles.skeletonSearch}>
				<Skeleton width='100%' height={50} />
			</View>
			{[...Array(6)].map((_, index) => (
				<Skeleton key={index} width='100%' height={70} style={{marginBottom: 5}}/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10,
		flex: 1,
	},
	skeletonSearch: {
		marginTop: 50,
		marginBottom: 30,
	},
});
