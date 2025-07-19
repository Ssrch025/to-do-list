import { IListItem } from '@/model/toDoModel';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import IconButton from './IconButton';

type Props = {
    text: string
    listItem: IListItem
    onRemove: () => void
    onHandleDoneTask: () => void
}

const ListItem = (props: Props) => {
    return (
        <View style={styles.container}>
            {props.listItem.isDone
                ? <IconButton
                    name='checkmark-circle-outline'
                    color='green'
                    onPress={props.onHandleDoneTask}
                />
                : <TouchableOpacity
                    style={styles.circleButton}
                    onPress={props.onHandleDoneTask}
                >
                    <View style={styles.circle} />
                </TouchableOpacity>
            }

            <Text style={[styles.textContainer, props.listItem.isDone && styles.textDone]}>
                {props.text}
            </Text>

            <IconButton
                name='trash'
                shape='square'
                color='red'
                backgroundColor='#fbb9b8ff'
                onPress={props.onRemove}
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
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fcfdeeff',
        padding: 10
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