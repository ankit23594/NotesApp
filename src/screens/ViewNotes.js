import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, FAB, List } from 'react-native-paper'
import Header from '../component/Header'
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote } from '../reducer/notesApp'

const ViewNotes = ({ navigation }) => {
  let notes = useSelector(state => state)
  const dispatch = useDispatch()

  const addNote = note => dispatch(addnote(note))

  const deleteNote = id =>dispatch(deletenote(id))

    return (
      <>
        <Header titleText='Note App' />
        <View style={styles.container}>
            {notes.length === 0 ? (
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>No notes to show</Text>
                </View>
            ) : (
                    <FlatList
                        data={notes}
                        renderItem={({ item }) => (
                            <List.Item
                                title={item.note.noteTitle}
                                description={item.note.noteDescription}
                                descriptionNumberOfLines={1}
                                titleStyle={styles.listTitle}
                                onPress = {()=> deleteNote(item.id)}
                            />
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                )}

            <FAB
                style={styles.fab}
                small
                icon='plus'
                label='Add a new Note'
                onPress={() => navigation.navigate('AddNotes', { addNote })
                }
            />
        </View>
    </>
    )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 20
    },
    fab: {
        backgroundColor: '#219653',
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 10
    },
    listTitle: {
        fontSize: 20
    }

})

  export default ViewNotes