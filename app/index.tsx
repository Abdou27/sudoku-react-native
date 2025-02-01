import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Sudoku from '@/components/Sudoku';
import {useState} from 'react';
import {SudokuPuzzle} from '@/ts/Sudoku';

export default function Index() {
    const [puzzle, setPuzzle] = useState(SudokuPuzzle.generate());
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Text style={styles.title}>Sudoku</Text>
            <View style={styles.container}>
                <Sudoku
                    puzzle={puzzle}
                    setPuzzle={setPuzzle}
                />
            </View>
            <View style={styles.buttons}>
                <Button
                    title="Solve"
                    onPress={() => setPuzzle(puzzle.solve())}
                />
                <Button
                    title="Reset"
                    onPress={() => setPuzzle(puzzle.reset())}
                />
                <Button
                    title="Regenerate"
                    onPress={() => setPuzzle(SudokuPuzzle.generate())}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 16,
    },
    title: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    container: {
        padding: 6,
    },
    buttons: {
        padding: 16,
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
    },
});
