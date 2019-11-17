import React, { Component } from 'react';
import Notes from '../Notes/Notes';
import NoteContext from '../NoteContext';
import { findNote } from '../globalFunctions';
import { PropTypes } from 'prop-types'
import Boundary from '../Boundary/Boundary';



export default class NotePageMain extends Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  handleDeleteNote= noteId => {
    this.props.history.push('/')
  }
  static contextType = NoteContext;

  render() {
    const {notes=[]} = this.context;
    const {noteId} = this.props.match.params;
    const note = findNote(notes, noteId) || { content: ''}
    
    return(
      <section>
        <Boundary>
          <Notes
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
          />
          
          <div className="NotePageMain_content">
            {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>)}
          </div>
        </Boundary>
      </section>
    )
  }
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}

NotePageMain.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,

}