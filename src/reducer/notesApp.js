export const ADD_NOTE = 'ADD_NOTE'
export const DELETE_NOTE = 'DELETE_NOTE'
export const EDIT_NOTE = 'EDIT_NOTE'

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

export function editnote(id, note) {
    return {
        type: EDIT_NOTE,
        id,
        note
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

        case EDIT_NOTE:
            let newData = [{
                id: action.id,
                note: action.note
            }, ...state.filter(data => data.id != action.id)]

            return newData

        default:
            return state
    }

}

export default notesReducer