import { NavigationContainer } from '@react-navigation/native';
import StackNavigators from './src/routes/StackNavigators';

export default function App() {
    return (
        <NavigationContainer>
            <StackNavigators />
        </NavigationContainer>
    );
}
