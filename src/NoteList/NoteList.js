import React from 'react';
import Notes from '../Notes/Notes';


export default function NoteList(props) {

    return (
      <div className="notesList">
        <ul>
          {props.notes.map(note =>
            <li key={note.id}>
              <Notes
                id={note.id}
                name={note.name}
                modified={note.modified}
              />
            </li>
            
          )}
        </ul>
        <div className='Notelist_button_wrapper'>
          <button> Add Note </button>
        </div>  
      </div>
    )
}

