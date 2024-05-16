import { View, Text, StyleSheet } from 'react-native';

export default function ContainerLogo() {
	return (
		<View style={styles.containerLogo}>
			<Text style={styles.textLogo}>Banco</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	containerLogo: {
		width: '100%',
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#eee',
	},
	textLogo: {
		fontSize: 25,
		fontWeight: 'bold',
		textTransform: 'uppercase',
		color: '#2C4070',
	},
});
