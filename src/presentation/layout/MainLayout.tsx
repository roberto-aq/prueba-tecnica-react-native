import { PropsWithChildren } from 'react';
import { View, Text } from 'react-native';

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<View
				style={{
					width: '100%',
					height: 60,
					alignItems: 'center',
					justifyContent: 'center',
					borderWidth: 1,
					borderColor: '#eee',
				}}
			>
				<Text
					style={{
						fontSize: 25,
						fontWeight: 'bold',
						textTransform: 'uppercase',
					}}
				>
					Banco
				</Text>
			</View>
			{children}
		</View>
	);
}
