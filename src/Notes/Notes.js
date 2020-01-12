import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import './Notes.css'


import {Link} from 'react-router-dom';

export default class Notes extends Component {

  static defaultProps = {
    onDeleteNote: () => {}
  }

  static contextType = NoteContext;

  handleClickDelete = (event) => {
    event.preventDefault();
    const noteId = this.props.id
    const urlNotes = `https://tranquil-dawn-62196.herokuapp.com/api/notes/${noteId}`
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
            <h2 className='Note__title'>
              <Link to={`/note/${id}`}>
                {name}
              </Link>
            </h2>
            <button onClick={this.handleClickDelete}>
              DELETE
            </button>
            <div className="Note__dates">
              <div className="Note__dates-modified">
                Modified
                {''}
                <span className="Date">
                  {modified}
                </span>
              </div>
            </div>
          </div>
        )
    }
}

Notes.propTypes = {
  onDeleteNote: PropTypes.func  
}

