import {StyleSheet, View} from 'react-native';
import MegaRow from './MegaRow';
import {SudokuPuzzle} from '@/ts/Sudoku';
import React from 'react';

type SudokuProps = {
    puzzle: SudokuPuzzle,
    setPuzzle: React.Dispatch<React.SetStateAction<SudokuPuzzle>>,
}

export default function Sudoku(props: SudokuProps) {
    return (
        <View style={styles.sudoku}>
            <MegaRow
                puzzle={props.puzzle}
                setPuzzle={props.setPuzzle}
                megaRowIdx={0}
            />
            <MegaRow
                puzzle={props.puzzle}
                setPuzzle={props.setPuzzle}
                megaRowIdx={1}
            />
            <MegaRow
                puzzle={props.puzzle}
                setPuzzle={props.setPuzzle}
                megaRowIdx={2}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    sudoku: {
        width: '100%',
        maxWidth: 600,
        aspectRatio: '1 / 1',
        margin: 'auto',
        borderColor: 'black',
        borderWidth: 2,
    },
});