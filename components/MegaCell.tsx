import {StyleSheet, View} from 'react-native';
import Row from './Row';
import {SudokuPuzzle} from '@/ts/Sudoku';
import React from 'react';

type MegaCellProps = {
    puzzle: SudokuPuzzle,
    setPuzzle: React.Dispatch<React.SetStateAction<SudokuPuzzle>>,
    megaRowIdx: 0 | 1 | 2,
    megaCellIdx: 0| 1 | 2,
}

export default function MegaCell(props: MegaCellProps) {
    return <View style={styles.megaCell}>
        <Row
            puzzle={props.puzzle}
            setPuzzle={props.setPuzzle}
            megaRowIdx={props.megaRowIdx}
            megaCellIdx={props.megaCellIdx}
            rowIdx={0}
        />
        <Row
            puzzle={props.puzzle}
            setPuzzle={props.setPuzzle}
            megaRowIdx={props.megaRowIdx}
            megaCellIdx={props.megaCellIdx}
            rowIdx={1}
        />
        <Row
            puzzle={props.puzzle}
            setPuzzle={props.setPuzzle}
            megaRowIdx={props.megaRowIdx}
            megaCellIdx={props.megaCellIdx}
            rowIdx={2}
        />
    </View>;
}

const styles = StyleSheet.create({
    megaCell: {
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        flexDirection: 'column',
        width: '33.33333333%',
        height: '100%',
    },
});