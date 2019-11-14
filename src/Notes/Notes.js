import React, { Component } from 'react';
import NoteContext from '../NoteContext';


import {Link} from 'react-router-dom';

export default class Notes extends Component {

  static defaultProps = {
    onDeleteNote: () => {}
  }

  static contextType = NoteContext;

  handleClickDelete = (event) => {
    event.preventDefault();
    const noteId = this.props.id
    const urlNotes = `http://localhost:9090/notes/${noteId}`
    fetch(urlNotes, {
      method:'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok)
        return response.json().then(event => Promise.reject(event))
      return response.json()
    })
    .then(() => {
      this.context.deleteNote(noteId)
      this.props.onDeleteNote(noteId)
    })
    .catch(error => {
      console.error({error})
    })
  }

  render() {

    const { name, id, modified} = this.props
    
    return (
          <div className="Note">
            <h2 className='noteTitle'>
              <Link to={`/note/${id}`}>
                {name}
              </Link>
            </h2>
            <button onClick={this.handleClickDelete}>
              DELETE
            </button>
            <div className="note_dates">
              <div className="note_modified">
                Modified
                {''}
                <span className="date">
                  {modified}
                </span>
              </div>
            </div>
          </div>
        )
    }
}

