import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from './src/constants/Colors';
import Strings from './src/constants/Strings';
import GameScreen from './src/screens/GameScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTitle: Strings.title,
                    headerTitleStyle: { color: Colors.textColor },
                    headerStyle: { backgroundColor: Colors.primaryColor },
                }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="GameScreen" component={GameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
