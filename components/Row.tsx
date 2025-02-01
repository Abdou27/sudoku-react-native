import {StyleSheet, View} from 'react-native';
import Cell from '@/components/Cell';
import {SudokuPuzzle} from '@/ts/Sudoku';
import React from 'react';

type RowProps = {
    puzzle: SudokuPuzzle,
    setPuzzle: React.Dispatch<React.SetStateAction<SudokuPuzzle>>,
    megaRowIdx: 0 | 1 | 2,
    megaCellIdx: 0| 1 | 2,
    rowIdx: 0 | 1 | 2,
}

export default function Row(props: RowProps) {
    return (
        <View style={styles.row}>
            <Cell
                puzzle={props.puzzle}
                setPuzzle={props.setPuzzle}
                megaRowIdx={props.megaRowIdx}
                megaCellIdx={props.megaCellIdx}
                rowIdx={props.rowIdx}
                cellIdx={0}
            />
            <Cell
                puzzle={props.puzzle}
                setPuzzle={props.setPuzzle}
                megaRowIdx={props.megaRowIdx}
                megaCellIdx={props.megaCellIdx}
                rowIdx={props.rowIdx}
                cellIdx={1}
            />
            <Cell
                puzzle={props.puzzle}
                setPuzzle={props.setPuzzle}
                megaRowIdx={props.megaRowIdx}
                megaCellIdx={props.megaCellIdx}
                rowIdx={props.rowIdx}
                cellIdx={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        height: '33.33333333%',
        width: '100%',
    },
});