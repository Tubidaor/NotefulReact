import React, { Component} from 'react';
import './App.css';
import FoldersNav from './FoldersNav/FoldersNav';
import NoteList from './NoteList/NoteList';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain'
import {Route, NavLink} from 'react-router-dom';
import NoteContext from './NoteContext';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';


class App extends Component {
  
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    const urlFolders = 'http://localhost:9090/folders'
    const urlNotes = 'http://localhost:9090/notes'

    fetch(urlFolders)
    .then(response => response.json())
    .then(data =>
      this.setState({
        folders: data
      }));

    fetch(urlNotes)
    .then(response => response.json())
    .then(data =>
      this.setState({
        notes: data
      }))
    
}

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  addFolder = (newFolder) => {
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  addNote = () => {
    const urlNotes = 'http://localhost:9090/notes'

    fetch(urlNotes)
    .then(res => {
      if (!res.ok)
        return res.json().then(e => Promise.reject(e))
      return res.json()
    })
    .then(data =>
      this.setState({
        notes: data
      }))
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          (<Route
            exact
            key={path}
            path={path}
            component={FoldersNav}
          />
        ))}
        <Route
          path="/note/:noteId"
          component={NotePageNav}
        />
        <Route path="/add-folder" component={NotePageNav} />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
            exact
            key={path}
            path={path}
            component={NoteList}
          />
        ))}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    );
  }

  render() {

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addNote: this.addNote,
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,  
    }

    return (
      <div className="App">
        <NoteContext.Provider value={contextValue}>
          <nav className='App__nav'>{this.renderNavRoutes()} </nav>
          <header className="App__header">
          <NavLink to={'/'}>NoteFull</NavLink>
          </header>
          <main className="App__main"> 
            {this.renderMainRoutes()}
          </main>
        </NoteContext.Provider>
        <footer>

        </footer>
      </div>
    );
  }
}

export default App;
