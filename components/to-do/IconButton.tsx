import React from 'react';

import Ionicons from '@expo/vector-icons/Ionicons';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { Colors } from '@/constants/Colors';

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
                color={props.color ?? Colors.custom.text}
            />
        </TouchableOpacity>
    );
}

export default IconButton

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: Colors.custom.secondaryContainer,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    square: {
        borderRadius: 8,
    },
})