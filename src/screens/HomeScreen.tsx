import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    TextInput,
    ToastAndroid,
    Platform,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import ButtonComponents from '../components/ButtonComponents';
import Colors from '../constants/Colors';
import { useIsFocused } from '@react-navigation/native';
import OptionComponent from '../components/OptionComponent';
import Strings from '../constants/Strings';
import DataGame from '../constants/DataGame';

const Home = ({ navigation }) => {
    const [isSelectedX, setIsSelectedX] = useState(false);
    const [isSelectedO, setIsSelectedO] = useState(false);
    const [input, setInput] = useState('');

    const isFocused = useIsFocused();

    const data = {
        userName: "",
        userNameBot: "",
        userSelection: "",
        botSelection: "",
        initialTurnUser: false,
        initialTurnBot: false
    }

    const showMessage = (message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
          } else {
            Alert.alert('Información', message);
        }
    };

    const onPressFunc = () => {
        if (!isSelectedX && !isSelectedO) {
            showMessage('Para iniciar, debe seleccionar una opción');
            return;
        }

        if (!input || !input.trim()) {
            showMessage('Para iniciar, debe ingresar un nombre válido');
            return;
        }

        //Iniciamos el juego
        const randomBot = Math.floor(Math.random() * 24);
        data.userName = input;
        data.userNameBot = DataGame.nameBots[randomBot].name;
        //generamos el turno de manera aleatoria
        const turn = Math.floor(Math.random() * 2);
        data.initialTurnUser = (turn === 0);
        data.initialTurnBot = (turn === 1);
        if (isSelectedX) {
            data.userSelection = 'X';
            data.botSelection = 'O';
        } else if (isSelectedO) {
            data.userSelection = 'O';
            data.botSelection = 'X';
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'GameScreen', params: {
                data: data
            } }],
        });
    };

    const onSelectedX = () => {
        setIsSelectedX(true);
        setIsSelectedO(false);
    };

    const onSelectedO = () => {
        setIsSelectedO(true);
        setIsSelectedX(false);
    };

    return (
        <View style={styles.home}>
            {isFocused && <StatusBar barStyle={'light-content'} />}
            <Text style={styles.subtitle}>{Strings.subtitle}</Text>
            <TextInput
                style={styles.input}
                onChangeText={newText => setInput(newText)}
                value={input}
            />
            <View style={styles.squares}>
                <OptionComponent
                    onSelected={onSelectedO}
                    label={'O'}
                    isSelected={isSelectedO}
                />
                <OptionComponent
                    onSelected={onSelectedX}
                    label={'X'}
                    isSelected={isSelectedX}
                />
            </View>
            <ButtonComponents
                label={Strings.startgame}
                onPressFunc={onPressFunc}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    home: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: Colors.textColor,
        margin: 20,
    },
    squares: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 20,
    },
    input: {
        height: 40,
        margin: 5,
        width: 250,
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 5,
        color: Colors.textColor,
        backgroundColor: Colors.secondaryColor,
        fontSize: 15,
        textAlign: 'center'
    },
});

export default Home;
