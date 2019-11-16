import React, { Component } from 'react';
import NoteForm from '../NoteForm/NoteForm';
import NoteContext from '../NoteContext';


export default class AddFolder extends Component {
  
  static defaultProps = {
    history: {
      push: () => {}
    }
  }

  static contextType = NoteContext;


  handleSubmit = e => {

    const postUrl = 'http://localhost:9090/folders'
    e.preventDefault();
    const newFolder = {
      name: e.target['folder-name'].value
    }
    fetch(postUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newFolder),
    })
    .then(res => {
      if(!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(newFolder => {
      this.context.addFolder(newFolder)
      this.props.history.push(`/folder/${newFolder.id}`)
    })
    .catch(error => {
      console.log(error)
    })
  }


  render() {
    return(
      <section className='addFolder'>
        <h2>Create Folder</h2>
        <NoteForm onSubmit={this.handleSubmit}>
          <div className='formFieldDiv'>
            <label htmlFor='addFolderInput'>
              Folder Name
            </label>
            <input type='text' id='addFolerInput' name='folder-name'/>
          </div>
          <div className='formButtonDiv'>
            <button type='submit'>Add Folder</button>
          </div>
        </NoteForm>
      </section>
    )
  }
}