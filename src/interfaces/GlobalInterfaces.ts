export interface ParamsGame {
    userName: string,
    userNameBot: string,
    userSelection: string,
    botSelection: string,
    initialTurnUser: boolean,
    initialTurnBot: boolean,
}

export interface ItemGame {
    id: number,
    row: number,
    col: number,
    optionGame: string
}

export interface GameServicesProps {
    userSelection: string,
    initialTurnUser: boolean,
    userName: string,
    userNameBot: string
}

export interface GameServicesReturn {
    initGame: ItemGame[],
    newGame: () => void,
    onSelected: (ItemGame) => void,
    turnUser: boolean,
    scoreUser: number,
    scoreBot: number
}