import React, { Component } from 'react';
import Notes from '../Notes/Notes';
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../globalFunctions';


export default class NoteList extends Component {
  static contextType = NoteContext;

  static defaultProps = {
    match: {
      params: {}
    }
  }

  render() {
    const { notes=[] } = this.context;
    const {folderId} = this.props.match.params;
    const notesForFolder = getNotesForFolder (
    notes,
    folderId
    );
    console.log(notesForFolder)
    return (
    
          <div className="notesList">
            <ul>
              {notesForFolder.map(note =>
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
}

