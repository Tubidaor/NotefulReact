import React, { Component } from 'react';
import Notes from '../Notes/Notes';
import NoteContext from '../NoteContext';
import { getNotesForFolder } from '../globalFunctions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Boundary from '../Boundary/Boundary';
import './NoteList.css';


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
    
          <div className="NoteListMain">
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
            <div className='NoteListMain__button-container'>
              <Link  to='/add-note'>
                <button className='NoteListMain__add-note-button'>
                  Add Note
                </button>
              </Link>
            </div>  
          </div>
    )
  }
}

NoteList.propTypes = {
  match: PropTypes.object
}
