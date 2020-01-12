import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import NoteForm from '../NoteForm/NoteForm'
import ValidateNameInput from '../ValidateInput/ValidateNameInput'
import PropTypes from 'prop-types';
import Boundary from '../Boundary/Boundary';
import './AddNote.css';

export default class AddNote extends Component {

  static defaultProps = {
    name: {
      value: ''
    },
    history: {
      push: () => {}
    }
  }

  static contextType = NoteContext;

  constructor(props) {
    super(props);
    this.state = {
      name: {
        value:'',
        touched: false,
        error: true,
        errMessage: ""
      },
      folder: {
        value: 'noFolder',
        touched: false,
        error: true,
        errMessage: ""
      }
    } 
  }
  
  nameInputValue(newNote) {
    if (newNote.length > 2) {
    this.setState({
      name: {
        value: newNote,
        touched: true,
        error: false
      },
    });
  }
  }

  folderChoice = (folder) => {
    this.setState({
      folder: {
        value: folder
      }
    })
  }

  handleSubmit = e => {
    const addNoteUrl = 'http://localhost:8000/api/notes'
    e.preventDefault()
    const newNote = {
      note_name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folder_id: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    
    const  {folder} = this.state
    try {
      const { name } = this.state;

      if (name.error === true) {
        throw new Error('Name_Error')
      } 
      if ( folder.value === 'noFolder') {
        throw new Error('Folder_Error');
      }
      else {
      fetch(addNoteUrl, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newNote),
      })
      .then(res => {
        if(!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folder_id}`)
      })
      .catch(err => {
        document.getElementById('noteNameInput').value=''
        this.setState({
          name: {
            value: '',
            error: true,
            errMessage: err
          }
          
        })
      })
    }
  }
  catch(err) {
    if (err.message === "Name_Error") {
      document.getElementById('noteNameInput').value=''
      this.setState({
        name: {
          errMessage: 'Name longer than 3 characters is required',
          error: true
        }
      })
    }
    if (err.message === "Folder_Error") {
      document.getElementById('noteNameInput').value=''
      this.setState({
        folder: {
          errMessage: 'Folder is required',
          error: true
        }
      })
    }
    else { }
  }

  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Whats on your mind?</h2>
        <Boundary>
          <NoteForm onSubmit={this.handleSubmit}>
            <div className='addNoteDiv'>
              <label htmlFor='noteNameInput'>
                Name
              </label>
              <input
                type='text'
                id='noteNameInput'
                name='note-name'
                aria-label="Name for note"
                aria-required="true"
                aria-describedby="nameInputError"
                onChange={e => this.nameInputValue(e.target.value)}/>
              {this.state.name.error && <ValidateNameInput message={this.state.name.errMessage}/>}
            </div>
            <div className='addNoteDiv'>
              <label htmlFor='noteContentInput'>
                Content
              </label>
              <input type='text' id='noteNameInput' name='note-content'/>
            </div>
            <div className='addNoteDiv'>
              <label htmlFor='noteFolderSelect'>
                Folder
              </label>
              <select onChange={e => this.folderChoice(e.target.value)} id='noteFolderSelect' name='note-folder-id'>
                  <option value="noFolder">...</option>
                {folders.map(folder => 
                  <option key={folder.id} value={folder.id}>
                    {folder.folder_name}
                  </option>)}
              </select>
              {this.state.folder.error && <ValidateNameInput message={this.state.folder.errMessage}/>}
            </div>
            <div className='NoteListMain__button-container'>
              <button className='NoteListMain__add-note-button' type='submit'>
                Add Note
              </button>
            </div>

          </NoteForm>
        </Boundary>

      </section>
    )
  }
}

AddNote.propTypes = {
  history: PropTypes.object
}