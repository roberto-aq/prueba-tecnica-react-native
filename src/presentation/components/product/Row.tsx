import { View, Text, StyleSheet, Image } from 'react-native';

interface Props {
	title: string;
	info: string;
	isLogo?: boolean;
}

export default function Row({ title, info, isLogo }: Props) {
	return (
		<View style={styles.row}>
			<Text
				style={[
					styles.textHeaderRow,
					isLogo
						? {
								flex: 0,
						  }
						: null,
				]}
			>
				{title}:
			</Text>
			{isLogo ? (
				<Image source={{ uri: info }} style={styles.logoImage} />
			) : (
				<Text style={styles.textInfoRow}>{info}</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		gap: 10,
	},
	textHeaderRow: {
		fontSize: 16,
		fontWeight: '500',
		color: '#888',
		flex: 1,
	},

	textInfoRow: {
		fontSize: 16,
		color: '#333',
		fontWeight: '500',
		flex: 1,
	},
	logoImage: {
		width: '100%',
		height: 200,
		flex: 1,
		objectFit: 'contain',
		marginLeft: 10,
	},
});
