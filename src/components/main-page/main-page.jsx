import React from 'react';
import {connect} from 'react-redux';
import {
    setAttributes,
    solveNonogram,
    setGameMode,
    getAttributes,
    getValues,
    getGameMode
} from 'domains/game-logic';
import {GameField} from 'components/game-field';
import {EditNonogram} from 'components/edit-nonogram';

export const MainPage = connect(
    state => ({
        gameAttributes: getAttributes(state),
        gameValues: getValues(state),
        gameMode: getGameMode(state)
    }),
    dispatch => ({
        onSolveNonogram: () => dispatch(solveNonogram()),
        onSetGameMode: ({gameMode}) => dispatch(setGameMode({gameMode}))
    })
)(({
    gameAttributes,
    gameValues,
    gameMode,
    onSolveNonogram,
    onSetGameMode
}) => (
    <div>
        <div>
            <button
                onClick={onSolveNonogram}
            >
                Solve nonogam
            </button>
        </div>
        <div>
            <button
                onClick={() => onSetGameMode(gameMode === 'play' ? {gameMode: 'edit'} : {gameMode: 'play'})}
            >
                {gameMode === 'play' ? 'Edit nonogram' : 'Show nonogram'}
            </button>
        </div>
        {gameMode === 'play' && (
            <GameField
                columnDigits={gameAttributes.columnDigits}
                rowDigits={gameAttributes.rowDigits}
                values={gameValues}
            />
        )}
        {gameMode === 'edit' && (
            <EditNonogram />
        )}
    </div>
));
