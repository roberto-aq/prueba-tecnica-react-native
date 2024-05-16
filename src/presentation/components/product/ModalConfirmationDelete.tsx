import {
	Modal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	useWindowDimensions,
	Pressable,
} from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../../config/theme/globalStyles';

interface Props {
	visible: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	productName: string;
}

export default function ModalConfirmationDelete({
	visible,
	onConfirm,
	onCancel,
	productName,
}: Props) {
	const { height } = useWindowDimensions();

	return (
		<Modal
			transparent={true}
			animationType='slide'
			visible={visible}
			onRequestClose={onCancel}
		>
			<View style={styles.modalContainer}>
				<View
					style={[
						styles.modalContent,
						{
							height: height * 0.4,
						},
					]}
				>
					<Pressable style={styles.modalHeader} onPress={onCancel}>
						<Ionicons name='close-outline' size={30} color='#333' />
					</Pressable>
					<View style={styles.modalContainerTitle}>
						<Text style={styles.modalTitle}>
							¿Estás seguro de eliminar el producto {productName}?
						</Text>
					</View>
					<View style={styles.modalContainerButtons}>
						<TouchableOpacity
							onPress={onConfirm}
							style={[styles.button, styles.confirmButton]}
						>
							<Text style={styles.buttonText}>Confirmar</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={onCancel}
							style={[styles.button, styles.cancelButton]}
						>
							<Text style={styles.buttonText}>Cancelar</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: '100%',
		backgroundColor: 'white',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		alignItems: 'center',
	},
	modalHeader: {
		width: '100%',
		alignItems: 'flex-end',
		justifyContent: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		flex: 1,
		borderBottomWidth: 1,
		borderBottomColor: '#F4F4F5',
	},
	modalContainerTitle: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 30,
		borderBottomWidth: 1,
		borderBottomColor: '#F4F4F5',
		width: '100%',
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: '500',
		textAlign: 'center',
		lineHeight: 25,
	},

	modalContainerButtons: {
		flexDirection: 'column',
		gap: 15,
		width: '100%',
		paddingTop: 30,
		paddingBottom: 10,
		flex: 3,
		paddingHorizontal: 20,
	},
	button: {
		padding: 10,
		height: 55,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	confirmButton: {
		backgroundColor: '#FFDD00',
	},
	cancelButton: {
		backgroundColor: colors.gray,
	},
	buttonText: {
		color: colors.secondary,
		fontWeight: 'bold',
		fontSize: 16,
	},
});
