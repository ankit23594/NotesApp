export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'

let noteID = 0

//Actions

export function addnote(note) {
    return {
        type: ADD_NOTE,
        id: noteID++,
        note
    }
}

export function deletenote(id) {
    return {
        type: DELETE_NOTE,
        payload: id
    }
}

// Reducers

function notesReducer(state = [], action) {
    switch (action.type) {
        case ADD_NOTE:
            return [
                ...state,
                {
                    id: action.id,
                    note: action.note
                }
            ]

        case DELETE_NOTE:
            return [...state.filter(data => data.id != action.payload)]

        default:
            return state
    }

}

export default notesReducer