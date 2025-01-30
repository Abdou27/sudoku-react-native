import {StyleSheet, View} from 'react-native';
import MegaCell from '@/components/MegaCell';

export default function MegaRow() {
    return (
        <View style={styles.megaRow}>
            <MegaCell />
            <MegaCell />
            <MegaCell />
        </View>
    );
}

const styles = StyleSheet.create({
    megaRow: {
        // borderColor: 'black',
        // borderWidth: 1,
        flex: 1,
        flexDirection: 'row',
        height: '33.33333333%',
        width: '100%',
    },
});