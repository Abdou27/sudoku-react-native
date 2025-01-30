import {StyleSheet, View} from 'react-native';
import MegaRow from './MegaRow';

export default function Sudoku() {
    return (
        <View style={styles.sudoku}>
            <MegaRow />
            <MegaRow />
            <MegaRow />
        </View>
    );
}


const styles = StyleSheet.create({
    sudoku: {
        width: 360,
        height: 360,
        margin: 'auto',
        borderColor: 'black',
        borderWidth: 2,
    },
});