
import React, { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native'
import {
    SafeAreaProvider,
    SafeAreaView,
} from 'react-native-safe-area-context'

import ActivityLoading from '@/components/to-do/ActivityLoading'
import IconButton from '@/components/to-do/IconButton'
import ListItem from '@/components/to-do/ListItem'
import StyledTextInput from '@/components/to-do/StyledTextInput'

import { Colors } from '@/constants/Colors'
import { IListItem } from '@/model/toDoModel'

const initialLists: IListItem[] = [
    { id: Date.now() + 1, header: `Example 1 \n(Tap here to open note)`, body: 'Please type here...', isDone: false },
    { id: Date.now() + 2, header: 'Example 2', body: '', isDone: false },
    { id: Date.now() + 3, header: 'Example 3', body: '', isDone: false },
]

const App = () => {
    const [header, setHeader] = useState<string>('')
    const [lists, setLists] = useState<IListItem[]>(initialLists)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const onHandleNote = (value: string) => {
        setHeader(value)
    }

    const handleBody = (listItem: IListItem, value: string) => {
        setLists(prev =>
            prev.map((item) => item.id === listItem.id
                ? { ...item, body: value }
                : item
            ))

    }

    const onDoneTask = (listItem: IListItem) => {
        setLists(prev =>
            prev.map((item) =>
                item.id === listItem.id ? { ...item, isDone: !item.isDone } : item
            ))
    }

    const onSubmit = () => {
        const newItem: IListItem = { id: Date.now(), header, body: '', isDone: false }
        setLists(prev => [newItem, ...prev])
        setHeader('')
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
        setTimeout(() => {
            getData('lists')
        }, 2000)
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
                behavior='padding'
                keyboardVerticalOffset={40}
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
                                        listItem={item}
                                        onRemove={() => onRemove(item)}
                                        onDoneTask={() => onDoneTask(item)}
                                        handleBody={(value) => handleBody(item, value)}
                                    />
                                )}
                            />}

                        {!isLoading &&
                            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20, height: 80 }}>
                                <StyledTextInput
                                    multiline
                                    maxLength={100}
                                    placeholder='Type here...'
                                    value={header}
                                    onChange={onHandleNote}
                                />
                                <IconButton
                                    name='add'
                                    shape='square'
                                    disabled={!header}
                                    onPress={onSubmit}
                                    color={header.length ? Colors.custom.primary : Colors.custom.disable}
                                    backgroundColor={header.length
                                        ? Colors.custom.primaryContainer
                                        : Colors.custom.disableContainer}
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
        backgroundColor: 'white',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
})