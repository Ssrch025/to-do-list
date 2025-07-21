import React from 'react'

import {
    Alert,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native'
import StyledTextInput from './StyledTextInput'

import { IListItem } from '@/model/toDoModel'

import { Colors } from '@/constants/Colors'

type Props = {
    isOpen: boolean
    listItem: IListItem
    onToggle: () => void
    handleBody: (value: string) => void
}

const ModalItem = (props: Props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isOpen}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                props.onToggle()
            }}
        >
            <Pressable
                style={styles.backgroundContainer}
                onPress={(e) => {
                    props.onToggle()
                    e.stopPropagation()
                }}
            >
                <Pressable
                    style={styles.modalContainer}
                    onPress={e => e.stopPropagation()}
                >
                    <View style={styles.headerContaienr}>
                        <Text style={styles.headerText}>
                            {props.listItem.header}
                        </Text>
                    </View>
                    <StyledTextInput
                        multiline
                        maxLength={500}
                        placeholder='Type here...'
                        value={props.listItem.body}
                        onChange={props.handleBody}
                    />
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default ModalItem

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    modalContainer: {
        margin: 20,
        height: '30%',
        backgroundColor: Colors.custom.background,
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    headerContaienr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 15,
        fontWeight: 'bold',
        maxWidth: '80%',
    },
    text: {
        color: Colors.custom.background,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});