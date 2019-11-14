import React, { Component} from 'react';
import './App.css';
import FoldersNav from './FoldersNav/FoldersNav';
import NoteList from './NoteList/NoteList';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain'
import {Route, NavLink} from 'react-router-dom';
import NoteContext from './NoteContext';
import NoteForm from './NoteForm/NoteForm'


const findFolder = (folders =[], folderId) =>
  folders.find(folder => folder.id === folderId);

const findNote = (notes=[], noteId) => 
  notes.find(note => note.id === noteId);




class App extends Component {
  
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    // fake date loading from API call
    // setTimeout(() => this.setState(folders), 600);
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

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          (<Route
            exact
            key={path}
            path={path}
            // render={routeProps => (
            //   <FoldersNav
            //     folders={this.state.folders}
            //     notes={this.state.notes}
            //     {...routeProps}
            //   />
            // )}
            component={FoldersNav}
          />
        ))}
        <Route
          path="/note/:noteId"
          // render={routeProps => {
          //     const {noteId} = routeProps.match.params;
          //     const note = findNote(this.state.notes, noteId) || {};
          //     const folder = findFolder(this.state.folders, note.folderId);
          //     return <NotePageNav {...routeProps} folder={folder} />;
          // }}
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
            // render={routeProps => {
            //   const {folderId} = routeProps.match.params;
            //   const notesForFolder = getNotesForFolder (
            //     this.state.notes,
            //     folderId
            //   );
            //   return (
            //     <NoteList
            //       {...routeProps}
            //       notes={notesForFolder}
            //     />
            //   )
            // }}
            component={NoteList}
          />
        ))}
        <Route
          path='/note/:noteId'
          // render={routeProps => {
          //   const {noteId} = routeProps.match.params;
          //   const note = findNote(this.state.notes, noteId);
          //   return <NotePageMain {...routeProps} note={note} />; 
          // }}
          component={NotePageMain}
        />
      </>
    );
  }

  render() {

    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      addNote: () => {},
      deleteNote: this.handleDeleteNote,
    }

    return (
      <div className="App">
        <NoteContext.Provider value={contextValue}>
          <nav className='App_nav'>{this.renderNavRoutes()} </nav>
          <header className="App-header">
          <NavLink to={'/'}>NoteFull</NavLink>
          </header>
          <main className="App_main"> 
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
