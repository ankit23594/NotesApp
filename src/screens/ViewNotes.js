import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { Text, FAB, Card, IconButton, Colors, Searchbar } from 'react-native-paper'
import Header from '../component/Header'
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote, editnote } from '../reducer/notesApp'

const ViewNotes = ({ navigation }) => {
  let notesProp = useSelector(state => state)

  const [notes, setNotes] = useState(notesProp)
  const [searchQuery, setSearchQuery] = useState('')

  const dispatch = useDispatch()

  const addNote = note => dispatch(addnote(note))

  const deleteNote = id => dispatch(deletenote(id))

  const editNote = (id, note) => dispatch(editnote(id, note))

  const onChangeSearch = query => {
      if(query === '') setNotes(notesProp)
      setSearchQuery(query)
  }

  const handleSearch = query => {
    let searchText = query.nativeEvent.text

    let newData = notes.filter(item => {
        return (
            item.note.noteDescription.toLowerCase().includes(searchText.toLowerCase()) || 
            item.note.noteTitle.toLowerCase().includes(searchText.toLowerCase())
        )
      })

    setNotes(newData)
  }

  const onSubmitSearch = query => handleSearch(query)

  useEffect(()=> {
    if(notesProp !== notes){
        setNotes(notesProp)
        setSearchQuery('')
    }
  }, [notesProp])

    return (
      <>
        <Header titleText='Note App' />
        <Searchbar
            placeholder="Search"
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={onSubmitSearch}
        />
        <View style={styles.container}>
            {notes.length === 0 ? (
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>No notes to show</Text>
                </View>
            ) : (
                    <FlatList
                        data={notes}
                        renderItem={({ item }) => (
                            <Card elevation={4} key={item.id} onPress = {()=> navigation.navigate('AddEditNotes', { note: item, editNote })}>
                                <Card.Title
                                    title={item.note.noteTitle}
                                    subtitle={item.note.noteDescription}
                                    right={props => 
                                    <IconButton
                                        icon="delete"
                                        color={Colors.red500}
                                        size={20}
                                        onPress={()=> deleteNote(item.id)}
                                      />
                                    }
                                />
                            </Card>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                )}

            <FAB
                style={styles.fab}
                small
                icon='plus'
                label='Add a new Note'
                onPress={() => navigation.navigate('AddEditNotes', { addNote })
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
    }
})

  export default ViewNotes