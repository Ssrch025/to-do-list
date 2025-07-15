import ListItem from '@/components/to-do/list-item'
import { IListItem } from '@/model/to-do-model'
import React, { useState } from 'react'
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const initialLists: IListItem[] = [
    {
        id: 1,
        text: ''
    },
    {
        id: 2,
        text: ''
    },
    {
        id: 3,
        text: ''
    },
]

const App = () => {
    const maxList = 30
    const [lists, setLists] = useState<IListItem[]>(initialLists)

    const onAdd = () => {
        const size = lists.length + 1
        if (size <= maxList) {
            const newItem: IListItem = { id: size, text: '' }
            setLists(prev => [newItem, ...prev])
        } else {
            Alert.alert(`เพิ่มได้สูงสุด ${maxList} รายการ`)
        }
    }

    const onHandleText = (item: IListItem, value: string) => {
        const findIndex = lists.findIndex((val) => val.id === item.id)
        lists[findIndex].text = value
        setLists([...lists])
    }

    const onRemove = (item: IListItem) => {
        const filterItem = lists.filter((val) => val.id !== item.id)
        setLists([...filterItem])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>To-Do List</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={onAdd}
                >
                    <Text style={styles.buttonText}>
                        + New
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#c0e7ccff' }]}
                    onPress={() => { }}
                >
                    <Text style={[styles.buttonText, { color: '#1a7535ff' }]}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>

            <SafeAreaProvider>
                <SafeAreaView>
                    <FlatList
                        data={lists}
                        renderItem={({ item }) => (
                            <ListItem
                                text={item.text}
                                onHandleText={(value) => onHandleText(item, value)}
                                onRemove={() => onRemove(item)}
                            />
                        )}
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        </View>
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
    button: {
        backgroundColor: '#fbb9b8ff',
        width: 80,
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 15,
    },
    buttonText: {
        color: '#ef3d3aff',
        textAlign: 'center',
    }
})