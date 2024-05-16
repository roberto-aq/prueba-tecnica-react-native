import { useState } from 'react';
import {
	View,
	Text,
	Button,
	Platform,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import {
	Control,
	Controller,
	FieldErrors,
	RegisterOptions,
	UseFormSetValue,
} from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Product } from '../../types/Product';

interface Props {
	control: Control<Product>;
	name: keyof Product;
	rules: RegisterOptions;
	errors: FieldErrors<Product>;
	label: string;
	setValue: UseFormSetValue<Product>;
	editable?: boolean;
}

export default function DatePicker({
	control,
	name,
	rules,
	errors,
	label,
	setValue,
	editable = false,
}: Props) {
	const [show, setShow] = useState(false);

	const onChange = (event: any, selectedDate: Date | undefined) => {
		setShow(Platform.OS === 'ios');
		if (selectedDate) {
			const localDate = new Date(
				selectedDate.getTime() +
					selectedDate.getTimezoneOffset() * 60000
			);
			setValue(name, localDate.toISOString().split('T')[0], {
				shouldValidate: true,
			});
		}
	};

	return (
		<View style={styles.containerInput}>
			<Text style={styles.label}>{label}</Text>

			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field: { value } }) => (
					<View>
						<TouchableOpacity
							onPress={() => editable && setShow(true)}
							style={
								editable
									? { opacity: 1 }
									: { opacity: 0.5, backgroundColor: '#f6f6f6' }
							}
						>
							<TextInput
								placeholder=''
								style={[
									styles.input,
									errors[name] && { borderColor: 'red' },
									editable ? { color: '#000' } : { color: '#C9C9CA' },
								]}
								value={
									value ? new Date(value).toLocaleDateString() : ''
								}
								editable={false} // Evita que el usuario edite directamente el campo
							/>
						</TouchableOpacity>
						{show && (
							<DateTimePicker
								value={value ? new Date(value) : new Date()}
								mode='date'
								display='default'
								onChange={onChange}
							/>
						)}
					</View>
				)}
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
