import { ActivityIndicator, StyleSheet, View } from 'react-native';
import MainLayout from '../../layout/MainLayout';

export default function FullScreenLoader() {
	return (
		<MainLayout>
			<View style={styles.containerLoader}>
				<ActivityIndicator size='large' color={'#FFDD00'} />
			</View>
		</MainLayout>
	);
}
const styles = StyleSheet.create({
	containerLoader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
