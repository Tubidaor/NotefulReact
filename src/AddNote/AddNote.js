import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import NoteForm from '../NoteForm/NoteForm'
import ValidateNameInput from '../ValidateNameInput'
import PropTypes from 'prop-types';
import Boundary from '../Boundary/Boundary';

export default class AddNote extends Component {

  static defaultProps = {
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
        touched: false
      },
      content: {
        value: '',
        touched: false
      }
    } 
  }
  
  nameInputValue(newNote) {
    this.setState({
      name: {
        value: newNote,
        touched: true
      }
    });
  }

  validateName() {
    const  name  = this.state.name.value.trim()

    if (name.length === 0) {
      return 'Name is required';
    }
    console.log(name)
  }

  handleSubmit = e => {

    const addNoteUrl = 'http://localhost:9090/notes'
    e.preventDefault()
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }

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
      this.props.history.push(`/folder/${note.folderId}`)
    })
    .catch(error => {
      console.error((error))
    })

  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='addNoteSection'>
        <h2>Whats on your mind?</h2>
        <Boundary>
          <NoteForm onSubmit={this.handleSubmit}>
            <div className='addNoteDiv'>
              <label htmlFor='noteNameInput'>
                Name
              </label>
              <input type='text' id='noteNameInput' name='note-name' onChange={e => this.nameInputValue(e.target.value)}/>
              {this.state.name.touched && <ValidateNameInput message={this.validateName()}/>}
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
              <select id='noteFolderSelect' name='note-folder-id'>
                {folders.map(folder => 
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>)}
              </select>
            </div>
            <div className='button'>
              <button type='submit'>
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