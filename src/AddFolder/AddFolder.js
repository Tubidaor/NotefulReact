import React, { Component } from 'react';
import NoteForm from '../NoteForm/NoteForm';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import Boundary from '../Boundary/Boundary';
import './AddFolder.css';
import ValidateNameInput from '../ValidateInput/ValidateNameInput';


export default class AddFolder extends Component {
  
  static defaultProps = {
    history: {
      push: () => {}
    }
  }

  state = {
    name: '',
    error: true,
  };

  static contextType = NoteContext;

  handleInput(name) {
    if (name.length > 2) {
    this.setState({
      name,
      error: false,
      errMessage: ''
    });
  }
  }


  handleSubmit = e => {
    try {
      if( this.state.error === true) {
        throw new Error("Folder name with more than 2 characters is required")
      }
      else {
      const postUrl = 'http://localhost:8000/api/folders'
      e.preventDefault();
      const newFolder = {
        folder_name: e.target['folder-name'].value
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
    }
  }
  catch(err) {
    document.getElementById('addFolderInput').value = ""
    this.setState({
      error: true,
      errMessage: err.message
    })
  }
  }


  render() {
    return(
      <section className='AddFolder'>
        <h2>Create Folder</h2>
        <Boundary>
          <NoteForm onSubmit={this.handleSubmit}>
            <div className='formFieldDiv'>
              <label htmlFor='addFolderInput'>
                Folder Name
              </label>
              <input type='text' id='addFolderInput' name='folder-name' onChange={e => this.handleInput(e.target.value)}/>
              {this.state.error && <ValidateNameInput message={this.state.errMessage}/>}
            </div>
            <div className='formButtonDiv'>
              <button type='submit'>Add Folder</button>
            </div>
          </NoteForm>
        </Boundary>
      </section>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object
}