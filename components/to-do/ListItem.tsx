import { IListItem } from '@/model/toDoModel';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconButton from './IconButton';
import ModalItem from './ModalItem';

type Props = {
    listItem: IListItem
    onRemove: () => void
    onDoneTask: () => void
    handleBody: (value: string) => void
}

const ListItem = (props: Props) => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const onToggle = () => setIsOpenModal(prev => !prev)

    return (
        <View style={styles.container}>
            {props.listItem.isDone
                ? <IconButton
                    name='checkmark-circle-outline'
                    color='green'
                    onPress={props.onDoneTask}
                />
                : <TouchableOpacity
                    style={styles.circleButton}
                    onPress={props.onDoneTask}
                >
                    <View style={styles.circle} />
                </TouchableOpacity>
            }

            <Pressable
                style={[styles.textContainer, props.listItem.isDone && { backgroundColor: '#c0e7ccff' }]}
                onPress={onToggle}
            >
                <Text style={[props.listItem.isDone && styles.textDone, styles.text]}>
                    {props.listItem.header}
                </Text>
                {!!props.listItem.body.length &&
                    <Ionicons size={15} name='pencil' />
                }
            </Pressable>


            <IconButton
                name='trash'
                shape='square'
                color='red'
                backgroundColor='#fbb9b8ff'
                onPress={props.onRemove}
            />

            <ModalItem
                isOpen={isOpenModal}
                listItem={props.listItem}
                handleBody={props.handleBody}
                onToggle={() => setIsOpenModal(prev => !prev)}
            />
        </View>
    );
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        minHeight: 50,
        gap: 10,
        marginBottom: 10,
    },
    textContainer: {
        flex: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fcfdeeff',
        padding: 10
    },
    text: {
        maxWidth: '80%',
        fontWeight: 'bold',
    },
    textDone: {
        textDecorationLine: 'line-through',
    },
    circleButton: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: '#b1b1b17c',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        borderWidth: 1,
        borderRadius: '50%',
        width: 15,
        height: 15,
    },
})