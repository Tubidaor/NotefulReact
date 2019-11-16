import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import NoteForm from '../NoteForm/NoteForm'





export default class AddNote extends Component {

  static defaultProps = {
    history: {
      push: () => {}
    }
  }

  static contextType = NoteContext;

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
        <NoteForm onSubmit={this.handleSubmit}>
          <div className='addNoteDiv'>
            <label htmlfor='noteNameInput'>
              Name
            </label>
            <input type='text' id='noteNameInput' name='note-name'/>
          </div>
          <div className='addNoteDiv'>
            <label htmlfor='noteContentInput'>
              Content
            </label>
            <input type='text' id='noteNameInput' name='note-content'/>
          </div>
          <div className='addNoteDiv'>
            <label htmlfor='noteFolderSelect'>
              Folder
            </label>
            <select id='noteFolderSelect' name='note-folder-id'>
              <option value={null}>...</option>
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

      </section>
    )
  }





}

