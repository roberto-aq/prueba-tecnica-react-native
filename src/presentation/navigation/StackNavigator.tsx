import { createStackNavigator } from '@react-navigation/stack';
import {
	AddProductScreen,
	EditProductScreen,
	HomeScreen,
	ProductScreen,
} from '../screens';

export type RootStackParams = {
	Home: undefined;
	Product: { id: string };
	AddProduct: undefined;
	EditProduct: { id: string };
};
const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='Home' component={HomeScreen} />
			<Stack.Screen name='Product' component={ProductScreen} />
			<Stack.Screen name='AddProduct' component={AddProductScreen} />
			<Stack.Screen
				name='EditProduct'
				component={EditProductScreen}
			/>
		</Stack.Navigator>
	);
};
