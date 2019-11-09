import React, { Component} from 'react';
import './App.css';
import FoldersNav from './FoldersNav/FoldersNav';
import NoteList from './NoteList/NoteList';
import NotePageNav from './NotePageNav/NotePageNav';
import NotePageMain from './NotePageMain/NotePageMain'
import {Route, NavLink} from 'react-router-dom';
import folders from './dummy-store';


const findFolder = (folders =[], folderId) =>
  folders.find(folder => folder.id === folderId);

const findNote = (notes=[], noteId) => 
  notes.find(note => note.id === noteId);

const getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
  ? notes
  : notes.filter(note => note.folderId === folderId)
)



class App extends Component {
  
  state = {
    notes: [],
    folders: []
  }

  componentDidMount() {
    // fake date loading from API call
    setTimeout(() => this.setState(folders), 600);
}

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          (<Route
            exact
            key={path}
            path={path}
            render={routeProps => (
              <FoldersNav
                folders={this.state.folders}
                notes={this.state.notes}
                {...routeProps}
              />
            )}
          />
        ))}
        <Route
          path="/note/:noteId"
          render={routeProps => {
              const {noteId} = routeProps.match.params;
              const note = findNote(this.state.notes, noteId) || {};
              const folder = findFolder(this.state.folders, note.folderId);
              return <NotePageNav {...routeProps} folder={folder} />;
          }}
        />
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
            render={routeProps => {
              const {folderId} = routeProps.match.params;
              console.log(folderId)
              const notesForFolder = getNotesForFolder (
                this.state.notes,
                folderId
              );
              return (
                <NoteList
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}
          />
        ))}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const {noteId} = routeProps.match.params;
            const note = findNote(this.state.notes, noteId);
            return <NotePageMain {...routeProps} note={note} />; 
          }}
        />
      </>
    );
  }

  render() {
    console.log('/folder')
    return (
      <div className="App">
        <nav className='App_nav'>{this.renderNavRoutes()} </nav>
        <header className="App-header">
         <NavLink to={'/'}>NoteFull</NavLink>
        </header>
        <main className="App_main"> 
          {this.renderMainRoutes()}
        </main>

        <footer>

        </footer>
      </div>
    );
  }
}

export default App;
