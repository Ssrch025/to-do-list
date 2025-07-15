import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

type Props = {
    text: string
    onHandleText: (value: string) => void
    onRemove: () => void
}

const ListItem = (props: Props) => {
    return (
        <View style={styles.item}>
            <SafeAreaProvider>
                <SafeAreaView>
                    <TextInput
                        style={{}}
                        onChangeText={props.onHandleText}
                        value={props.text}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
            <TouchableOpacity
                style={styles.button}
                onPress={props.onRemove}
            >
                <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ListItem

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fcfdeeff',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 10,
        marginHorizontal: 15,
        // layout
        flexDirection: 'row',
    },
    title: {
        fontSize: 32,
    },
    button: {
        borderRadius: '50%',
    },
    buttonText: {
        width: 20,
        height: 20,
        textAlign: 'center',
    }
})