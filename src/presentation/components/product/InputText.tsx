import {
	Control,
	Controller,
	FieldErrors,
	RegisterOptions,
} from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Product } from '../../types/Product';

interface Props {
	control: Control<Product>;
	name: keyof Product;
	rules: RegisterOptions;
	errors: FieldErrors<Product>;
	label: string;
	editable?: boolean;
}

export default function InputText({
	control,
	name,
	rules,
	errors,
	label,
	editable = true,
}: Props) {
	return (
		<View style={styles.containerInput}>
			<Text style={styles.label}>{label}</Text>
			<Controller
				control={control}
				rules={rules}
				render={({ field: { onChange, value, onBlur } }) => (
					<TextInput
						placeholder=''
						style={[
							styles.input,
							errors[name] && { borderColor: 'red' },
							editable
								? { color: '#000' }
								: {
										color: '#C9C9CA',
										backgroundColor: '#f6f6f6',
										opacity: 0.5,
								  },
						]}
						onChangeText={onChange}
						value={value}
						onBlur={onBlur}
						editable={editable}
					/>
				)}
				name={name}
			/>
			{errors[name] && (
				<Text style={styles.errorText}>{errors[name]?.message}</Text>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	containerInput: {
		marginHorizontal: 5,
		marginBottom: 15,
	},

	label: {
		fontSize: 14,
		fontWeight: '500',
		marginBottom: 10,
	},

	input: {
		borderWidth: 1,
		borderColor: '#E9E9E9',
		borderRadius: 5,
		padding: 10,
	},
	errorText: {
		color: 'red',
		marginTop: 5,
	},
});
