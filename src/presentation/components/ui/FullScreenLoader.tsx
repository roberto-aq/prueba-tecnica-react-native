import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function FullScreenLoader() {
	return (
		<View style={styles.containerLoader}>
			<ActivityIndicator size='large' color={'#FFDD00'} />
		</View>
	);
}
const styles = StyleSheet.create({
	containerLoader: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
