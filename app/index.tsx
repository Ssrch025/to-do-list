import IconButton from '@/components/to-do/icon-button'
import ListItem from '@/components/to-do/list-item'
import { IListItem } from '@/model/to-do-model'
import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

// to-do
// 1. fix height button, re-layout
// 2. fix id
// 3. Persist data using local storage
// 4. refactor

const initialLists: IListItem[] = [
    { id: 1, text: 'List 1', isDone: false },
    { id: 2, text: 'List 2', isDone: false },
    { id: 3, text: 'List 3', isDone: false },
]

const App = () => {
    const [note, setNote] = useState<string>('')
    const [lists, setLists] = useState<IListItem[]>(initialLists)

    const onHandleNote = (value: string) => {
        setNote(value)
    }

    const onHandleDoneTask = (listItem: IListItem) => {
        setLists(prev =>
            prev.map((item) =>
                item.id === listItem.id ? { ...item, isDone: !item.isDone } : item
            ))
    }

    const onSubmit = () => {
        const newItem: IListItem = { id: Date.now(), text: note, isDone: false }
        setLists(prev => [newItem, ...prev])
        setNote('')
    }

    const onRemove = (item: IListItem) => {
        setLists(prev =>
            prev.filter((val) =>
                val.id !== item.id))
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Text style={styles.header}>To-Do List</Text>

                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20, height: 80 }}>
                    <TextInput
                        style={styles.textInput}
                        multiline={true}
                        maxLength={500}
                        value={note}
                        onChangeText={onHandleNote}
                    />
                    <IconButton
                        name='add'
                        shape='square'
                        onPress={onSubmit}
                        color={note.length ? '#0045f4ff' : 'black'}
                        backgroundColor={note.length ? '#c3d0f1ff' : '#b1b1b17c'}
                    />
                </View>

                <FlatList
                    data={lists}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            text={item.text}
                            listItem={item}
                            onRemove={() => onRemove(item)}
                            onHandleDoneTask={() => onHandleDoneTask(item)}
                        />
                    )}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10,
    },
    header: {
        fontSize: 32,
        textAlign: 'center',
    },
    textInput: {
        flex: 5,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
})