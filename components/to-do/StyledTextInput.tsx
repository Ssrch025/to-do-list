import React from 'react'

import {
    StyleSheet,
    TextInput,
} from 'react-native'

import { Colors } from '@/constants/Colors'

type Props = {
    value: string
    placeholder?: string
    multiline?: boolean
    maxLength?: number
    onChange: React.ComponentProps<typeof TextInput>['onChangeText']
}

const StyledTextInput = (props: Props) => {
    return (
        <TextInput
            style={styles.textInput}
            placeholder={props.placeholder}
            multiline={props.multiline}
            maxLength={props.maxLength}
            value={props.value}
            onChangeText={props.onChange}
        />
    )
}

export default StyledTextInput

const styles = StyleSheet.create({
    textInput: {
        flex: 5,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: Colors.custom.background,
    },
})