import {
	View,
	Text,
	StyleSheet,
	StyleProp,
	ViewStyle,
	DimensionValue,
} from 'react-native';

interface Props {
	width: DimensionValue;
	height: DimensionValue;
	style?: StyleProp<ViewStyle>;
}

export default function Skeleton({ width, height, style }: Props) {
	return <View style={[styles.skeleton, { width, height }, style]} />;
}

const styles = StyleSheet.create({
	skeleton: {
		backgroundColor: '#E0e0e0',
		borderRadius: 6,
		opacity: 0.7,
	},
});
