import { useEffect, useState } from 'react'
import { Alert } from 'react-native';
import Strings from '../constants/Strings';

interface ItemGame {
    id: number,
    row: number,
    col: number,
    optionGame: string
}

interface GameServicesProps {
    userSelection: string,
    initialTurnUser: boolean,
    userName: string,
    userNameBot: string
}

interface GameServicesReturn {
    initGame: ItemGame[],
    newGame: () => void,
    onSelected: (ItemGame) => void,
    turnUser: boolean,
    scoreUser: number,
    scoreBot: number
}

const GameServices = ({userSelection, initialTurnUser, userName, userNameBot}: GameServicesProps): GameServicesReturn => {
    const [initGame, setInitGame] = useState([]);
    const [turnUser, setTurnUser] = useState(false);
    const [botSelection, setBotSelection] = useState('');
    const [scoreUser, setScoreUser] = useState(0);
    const [scoreBot, setScoreBot] = useState(0);

    const onHandleInitGame = () => {
        // Inicializamos la matriz para juego
        const matriz = [];
        for (let i = 1; i <= 9; i++) {
            matriz.push({ id: i, row: Math.ceil(i / 3), col: (i - 1) % 3 + 1, optionGame: '' });
        }
        validateTurn(matriz);
    }

    useEffect(() => {
        onHandleInitGame();
    }, []);

    const newGame = () => {
        onHandleInitGame();
    }

    const validateTurn = (matriz: ItemGame[]) => {
        setBotSelection(userSelection === 'X' ? 'O' : 'X');
        if (!initialTurnUser) {
            //Obtenemos una posición aleatoria para el bot
            const initialPosition = Math.floor(Math.random() * 9) + 1;
            const find = matriz.map(it =>
                it.id === initialPosition ? { ...it, optionGame: botSelection } : it
            );
            setInitGame(find);
            setTurnUser(!initialTurnUser);
        } else {
            setInitGame(matriz);
            setTurnUser(initialTurnUser);
        }
    }

    const onSelected = (item: ItemGame) => {
        if (turnUser) {
            //Validamos si la posición ya está ocupada
            const positionBlock = initGame.filter(mt => mt.row === item.row && mt.col === item.col && mt.optionGame !== '');
            if (positionBlock.length > 0) {
                return
            }

            const find = initGame.map(it =>
                (it.row === item.row && it.col === item.col) ? { ...it, optionGame: userSelection } : it
            );
            setInitGame(find);
            setTurnUser(!turnUser);

            //Validamos previamente si el usuario ganó
            if (checkWinner(find, item)) {
                setScoreUser(scoreUser + 1);
                Alert.alert(Strings.information, `${userName} has ganado el juego. ¡Felicidades!`, [
                    {text: 'OK', onPress: () => newGame()}
                ]);
            } else {
                //Ejecutamos jugada del bot
                setTimeout(() => {
                    //Obtenemos la matriz con opciones disponibles
                    const matrizFound = find.filter(mt => mt.optionGame === '');
                    if (matrizFound.length > 0) {
                        const index = Math.floor(Math.random() * matrizFound.length);
                        const newPosition = matrizFound[index].id;
                        const findBot = find.map(it =>
                            it.id === newPosition ? { ...it, optionGame: botSelection } : it
                        );
                        setInitGame(findBot);
                        setTurnUser(turnUser);

                        if (checkWinnerBot(findBot, newPosition)) {
                            setScoreBot(scoreBot + 1);
                            Alert.alert(Strings.information, `${userNameBot} ha ganado el juego, intentalo nuevamente`, [
                                {text: 'OK', onPress: () => newGame()}
                            ]);
                        }
                    }

                    if (matrizFound.length === 0 || matrizFound.length - 1 === 0) {
                        Alert.alert(Strings.information, Strings.informationMessage, [
                            {text: 'OK', onPress: () => newGame()}
                        ]);
                    }
                }, 1000);
            }
        } else {
            setBotSelection(userSelection === 'X' ? 'O' : 'X');
            //Obtenemos la matriz con opciones disponibles
            const matrizFound = initGame.filter(mt => mt.optionGame === '');
            if (matrizFound.length > 0) {
                const index = Math.floor(Math.random() * matrizFound.length);
                const newPosition = matrizFound[index].id;

                const find = initGame.map(it =>
                    it.id === newPosition ? { ...it, optionGame: botSelection } : it
                );
                setInitGame(find);
                setTurnUser(!turnUser);

                if (checkWinnerBot(find, newPosition)) {
                    setScoreBot(scoreBot + 1);
                    Alert.alert(Strings.information, `${userNameBot} ha ganado el juego, intentalo nuevamente`, [
                        {text: 'OK', onPress: () => newGame()}
                    ]);
                }
            }

            if (matrizFound.length === 0 || matrizFound.length - 1 === 0) {
                Alert.alert(Strings.information, Strings.informationMessage, [
                    {text: 'OK', onPress: () => newGame()}
                ]);
            }
        }
    };

    const checkWinner = (matriz: ItemGame[], item: ItemGame) => {
        const winnerRow = matriz.filter(it => it.row === item.row && it.optionGame === userSelection);
        if (winnerRow.length === 3) {
            return true;
        }

        const winnerCol = matriz.filter(it => it.col === item.col && it.optionGame === userSelection);
        if (winnerCol.length === 3) {
            return true;
        }

        const winnerDiagonalLeft = matriz.filter(it => it.row === it.col && it.optionGame === userSelection);
        if (winnerDiagonalLeft.length === 3) {
            return true;
        }

        const winnerDiagonalRight = matriz.filter(it => it.row + it.col === 4 && it.optionGame === userSelection);
        if (winnerDiagonalRight.length === 3) {
            return true;
        }
    }

    const checkWinnerBot = (matriz: ItemGame[], position: number) => {
        const item = matriz.filter(it => it.id === position);
        if (item.length > 0) {
            const winnerRow = matriz.filter(it => it.row === item[0].row && it.optionGame === botSelection);
            if (winnerRow.length === 3) {
                return true;
            }

            const winnerCol = matriz.filter(it => it.col === item[0].col && it.optionGame === botSelection);
            if (winnerCol.length === 3) {
                return true;
            }

            const winnerDiagonalLeft = matriz.filter(it => it.row === it.col && it.optionGame === botSelection);
            if (winnerDiagonalLeft.length === 3) {
                return true;
            }

            const winnerDiagonalRight = matriz.filter(it => it.row + it.col === 4 && it.optionGame === botSelection);
            if (winnerDiagonalRight.length === 3) {
                return true;
            }
        }
        return false;
    }

    return {initGame, newGame, onSelected, turnUser, scoreUser, scoreBot};
}

export default GameServices;