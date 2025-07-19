import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    name: React.ComponentProps<typeof Ionicons>['name']
    shape?: 'circle' | 'square'
    disabled?: boolean
    size?: number
    color?: React.ComponentProps<typeof Ionicons>['color']
    backgroundColor?: string
    onPress: React.ComponentProps<typeof TouchableOpacity>['onPress']
}

const IconButton = (props: Props) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                props.backgroundColor && { backgroundColor: props.backgroundColor },
                props.shape === 'square' && styles.square,
            ]}
            disabled={props.disabled}
            onPress={props.onPress}
        >
            <Ionicons
                name={props.name}
                size={props.size ?? 20}
                color={props.color ?? 'green'}
            />
        </TouchableOpacity>
    );
}

export default IconButton

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: '#c0e7ccff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        borderRadius: 8,
    },
})