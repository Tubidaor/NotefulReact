import React, { Component } from 'react';
import Notes from '../Notes/Notes';
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../globalFunctions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Boundary from '../Boundary/Boundary';


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
    
    return (
    
          <div className="notesList">
            <ul>
              {notesForFolder.map(note =>
                <li key={note.id}>
                  <Boundary>
                    <Notes
                      id={note.id}
                      name={note.name}
                      modified={note.modified}
                    />
                  </Boundary>
                </li>
                
              )}
            </ul>
            <div className='Notelist_button_wrapper'>
              <Link to='/add-note'>Add Note</Link>
            </div>  
          </div>
    )
  }
}

NoteList.propTypes = {
  match: PropTypes.object
}
