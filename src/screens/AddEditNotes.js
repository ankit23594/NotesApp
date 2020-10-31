import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, IconButton, TextInput, FAB } from 'react-native-paper'
import Header from '../component/Header'

function AddEditNotes(props) {
    let { navigation } = props
    let { note, addNote, editNote } = navigation.state.params

    const [noteTitle, setNoteTitle] = useState(note ? note.note.noteTitle : '')
    const [noteDescription, setNoteDescription] = useState(note ? note.noteDescription : '')

    let onSaveNote = () => {
        let result = { noteTitle, noteDescription }

        if (addNote) addNote(result)
        else if (editNote) editNote(note.id, result)

        navigation.goBack()
    }

    useEffect(()=> {
        if(note) {
            if(note.note.noteTitle !== noteTitle)
                setNoteTitle(note.note.noteTitle)
            if(note.note.noteDescription !== noteDescription)
                setNoteDescription(note.note.noteDescription)
        } else {
            setNoteTitle('')
            setNoteDescription('')
        }
    }
    , [note])

    return (
        <>
            <Header titleText='Add a New Note' />
            <IconButton
                icon="close"
                size={25}
                color='white'
                onPress={() => navigation.goBack()}
                style={styles.iconButton}
            />

            <View style={styles.container}>
                <TextInput
                    label="Add Note Title here"
                    value={noteTitle}
                    mode='outlined'
                    onChangeText={setNoteTitle}
                    style={styles.title}
                />
                <TextInput
                    label="Add Note Description"
                    value={noteDescription}
                    onChangeText={setNoteDescription}
                    mode="flat"
                    multiline={true}
                    style={styles.text}
                    scrollEnabled={true}
                    returnKeyLabel='done'
                    blurOnSubmit={true}
                />
                <FAB
                    style={styles.fab}
                    small
                    icon="check"
                    disabled={noteTitle == '' ? true : false}
                    onPress={() => onSaveNote()}
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
    iconButton: {
        backgroundColor: '#219653',
        position: 'absolute',
        right: 0,
        top: 20,
        margin: 10
    },
    title: {
        fontSize: 24,
        marginBottom: 16
    },
    text: {
        height: 300,
        fontSize: 16
    },
    fab: {
        position: 'absolute',
        margin: 20,
        right: 0,
        bottom: 0,
        backgroundColor: '#219653'
    }

})

export default AddEditNotes