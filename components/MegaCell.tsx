import {StyleSheet, View} from 'react-native';
import Row from './Row';

export default function MegaCell() {
    return <View style={styles.megaCell}>
        <Row />
        <Row />
        <Row />
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