import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ContainerLogo } from '../components';

export default function MainLayout({ children }: PropsWithChildren) {
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<ContainerLogo />
			<View
				style={{
					marginHorizontal: 25,
					marginBottom: 60,
					flex: 1,
				}}
			>
				{children}
			</View>
		</View>
	);
}
