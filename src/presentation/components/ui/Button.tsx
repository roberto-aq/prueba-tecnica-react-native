import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
	text: string;
	onPress: () => void;
	color?: string;
	textColor?: string;
}

export default function Button({
	text,
	onPress,
	color = '#E9ECF3',
	textColor = '#4E5F87',
}: Props) {
	return (
		<Pressable
			style={[styles.button, { backgroundColor: color }]}
			onPress={onPress}
		>
			<Text style={[styles.text, { color: textColor }]}>{text}</Text>
		</Pressable>
	);
}
const styles = StyleSheet.create({
	button: {
		height: 55,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
	},
	text: {
        fontWeight: '500',
        fontSize: 16,
    },
});
