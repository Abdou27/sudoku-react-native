import {Platform, StyleSheet, TextInput, View} from 'react-native';
import {useState} from 'react';
import {ImageStyle, TextStyle, ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export default function Cell() {
    const [value, setValue] = useState<string | null>();
    const [dynamicStyles, setDynamicStyles] = useState<Partial<TextStyle>>({
        cursor: 'pointer',
    });
    return <View style={styles.cell}>
        <TextInput
            value={value ?? ''}
            style={[styles.input, dynamicStyles]}
            onChangeText={s => {
                const lastChar = s[s.length - 1];
                if (/^[0-9]$/.test(lastChar)) {
                    setValue(lastChar);
                }
            }}
            onFocus={() => {
                setDynamicStyles({
                    ...dynamicStyles,
                    cursor: 'auto',
                    backgroundColor: 'black',
                    color: 'white',
                });
            }}
            onBlur={() => {
                setDynamicStyles({
                    ...dynamicStyles,
                    cursor: 'pointer',
                    backgroundColor: undefined,
                    color: undefined,
                });
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
        ...(Platform.OS === 'web' ? {
            outlineStyle: 'none',
        } : {}),
        width: '100%',
        height: '100%',
        textAlign: 'center',
    },
});