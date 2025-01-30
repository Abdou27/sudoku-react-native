import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Sudoku from '@/components/Sudoku';

export default function Index() {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sudoku</Text>
            <View>
                <Sudoku />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
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
});
