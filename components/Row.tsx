import {StyleSheet, View} from 'react-native';
import Cell from '@/components/Cell';

export default function Row() {
    return (
        <View style={styles.row}>
            <Cell />
            <Cell />
            <Cell />
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        // borderColor: 'black',
        // borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        height: '33.33333333%',
        width: '100%',
    },
});