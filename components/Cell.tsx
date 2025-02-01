import {Platform, StyleSheet, TextInput, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {SudokuPuzzle, ValidSudokuCellValue} from '@/ts/Sudoku';

type CellProps = {
    puzzle: SudokuPuzzle,
    setPuzzle: React.Dispatch<React.SetStateAction<SudokuPuzzle>>,
    megaRowIdx: 0 | 1 | 2,
    megaCellIdx: 0 | 1 | 2,
    rowIdx: 0 | 1 | 2,
    cellIdx: 0 | 1 | 2,
};

const LIGHT_RED = '#FFCCCB';
const LIGHT_BLUE = '#ADD8E6';
const GREY = '#adadad';

export default function Cell(props: CellProps) {
    const value = useMemo(() => props.puzzle.getValue(props.megaRowIdx, props.megaCellIdx, props.rowIdx, props.cellIdx), [props.puzzle]);
    const isReadonly = useMemo(() => props.puzzle.isReadonly(props.megaRowIdx, props.megaCellIdx, props.rowIdx, props.cellIdx), [props.puzzle]);
    const isInvalid = useMemo(() => props.puzzle.isInvalid(props.megaRowIdx, props.megaCellIdx, props.rowIdx, props.cellIdx), [props.puzzle]);
    const [dynamicStyles, setDynamicStyles] = useState<Partial<TextStyle>>({
        cursor: isReadonly ? 'auto' : 'pointer',
        backgroundColor: isReadonly ? GREY : isInvalid ? LIGHT_RED : undefined,
    });
    useMemo(() => {
        setDynamicStyles(v => ({
            ...v,
            backgroundColor: isReadonly ? GREY : isInvalid ? LIGHT_RED : undefined,
        }));
    }, [props.puzzle]);
    return <View style={styles.cell}>
        <TextInput
            readOnly={isReadonly}
            value={value?.toString() ?? ''}
            keyboardType="numeric"
            style={[styles.input, dynamicStyles]}
            onChangeText={s => {
                if (s.length > 0) {
                    const lastChar = s[s.length - 1];
                    if (/^[1-9]$/.test(lastChar)) {
                        const value = parseInt(lastChar) as ValidSudokuCellValue;
                        const puzzle = props.puzzle.setValue(props.megaRowIdx, props.megaCellIdx, props.rowIdx, props.cellIdx, value);
                        props.setPuzzle(puzzle);
                    }
                } else {
                    const puzzle = props.puzzle.setValue(props.megaRowIdx, props.megaCellIdx, props.rowIdx, props.cellIdx, null);
                    props.setPuzzle(puzzle);
                }
            }}
            onFocus={() => {
                if (isReadonly) {
                    return;
                }
                setDynamicStyles(v => ({
                    ...v,
                    cursor: 'auto',
                    backgroundColor: LIGHT_BLUE,
                    fontWeight: 'bold',
                }));
            }}
            onBlur={() => {
                if (isReadonly) {
                    return;
                }
                setDynamicStyles(v => ({
                    ...v,
                    cursor: 'pointer',
                    backgroundColor: isInvalid ? LIGHT_RED : undefined,
                    fontWeight: undefined,
                }));
            }}
        />
    </View>;
}

const styles = StyleSheet.create({
    cell: {
        width: '33.33333333%',
        height: '100%',
        borderColor: 'black',
        borderWidth: 1,
    },
    input: {
        borderWidth: 0,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        ...(Platform.OS === 'web' ? {
            outlineStyle: 'none',
        } : {}),
    },
});