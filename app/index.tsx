
import ActivityLoading from '@/components/to-do/ActivityLoading'
import IconButton from '@/components/to-do/IconButton'
import ListItem from '@/components/to-do/ListItem'
import { IListItem } from '@/model/toDoModel'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const initialLists: IListItem[] = [
    { id: Date.now() + 1, text: 'List 1', isDone: false },
    { id: Date.now() + 2, text: 'List 2', isDone: false },
    { id: Date.now() + 3, text: 'List 3', isDone: false },
]

const App = () => {
    const [note, setNote] = useState<string>('')
    const [lists, setLists] = useState<IListItem[]>(initialLists)
    const [isLoading, setIsLoading] = useState<boolean>(false)

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

    const storeData = async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (err) {
            console.error('Error:', err)
        }
    }

    const getData = async (key: string) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            if (jsonValue !== null) {
                const parseValue: IListItem[] = JSON.parse(jsonValue)
                setLists(parseValue)
            }
        } catch (err) {
            console.error('Error:', err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            getData('lists')
        }, 5000)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            storeData('lists', lists)
        }
    }, [isLoading, lists])

    return (
        <SafeAreaProvider>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.header}>To-Do List</Text>

                        {isLoading
                            ? <ActivityLoading />
                            : <FlatList
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
                            />}

                        {!isLoading &&
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
                                    disabled={!note}
                                    onPress={onSubmit}
                                    color={note.length ? '#0045f4ff' : 'black'}
                                    backgroundColor={note.length ? '#c3d0f1ff' : '#b1b1b17c'}
                                />
                            </View>}
                    </SafeAreaView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
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
        marginBottom: 10,
    },
    textInput: {
        flex: 5,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
})