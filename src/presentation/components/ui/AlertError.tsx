import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../../config/theme/globalStyles';

interface Props {
	visible: boolean;
	message: string;
	onClose: () => void;
}

export default function AlertError({
	visible,
	message,
	onClose,
}: Props) {
	const { height, width } = useWindowDimensions();

	return (
		<Modal
			animationType='fade'
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.centeredView}>
				<View
					style={[
						styles.modalView,
						{
							width: width * 0.7,
							height: height * 0.2,
						},
					]}
				>
					<Text style={styles.modalTitle}>¡Error!</Text>
					<Text style={styles.modalText}>{message}</Text>
					<Pressable style={styles.button} onPress={onClose}>
						<Ionicons name='close-outline' size={30} color='#333' />
					</Pressable>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalView: {
		borderRadius: 10,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 2,
	},
	modalTitle: {
		fontSize: 35,
		fontWeight: '700',
		marginBottom: 20,
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '500',
		color: "#777"
	},
	button: {
		borderRadius: 999,
		padding: 5,
		backgroundColor: colors.primary,
		position: 'absolute',
		top: -15,
		right: -15,
	},
});
