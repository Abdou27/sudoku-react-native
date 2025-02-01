import {StyleSheet, View} from 'react-native';
import MegaCell from '@/components/MegaCell';
import {SudokuPuzzle} from '@/ts/Sudoku';
import React from 'react';

type MegaRowProps = {
    megaRowIdx: 0 | 1 | 2,
    puzzle: SudokuPuzzle,
    setPuzzle: React.Dispatch<React.SetStateAction<SudokuPuzzle>>,
}

export default function MegaRow(props: MegaRowProps) {
    return (
        <View style={styles.megaRow}>
            <MegaCell
                puzzle={props.puzzle}
                setPuzzle={props.setPuzzle}
                megaRowIdx={props.megaRowIdx}
                megaCellIdx={0}
            />
            <MegaCell
                puzzle={props.puzzle}
                setPuzzle={props.setPuzzle}
                megaRowIdx={props.megaRowIdx}
                megaCellIdx={1}
            />
            <MegaCell
                puzzle={props.puzzle}
                setPuzzle={props.setPuzzle}
                megaRowIdx={props.megaRowIdx}
                megaCellIdx={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    megaRow: {
        flex: 1,
        flexDirection: 'row',
        height: '33.33333333%',
        width: '100%',
    },
});