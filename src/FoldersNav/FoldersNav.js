import React, { Component } from 'react';
import './FoldersNav.css'
import { NavLink , Link } from 'react-router-dom';
import NoteContext from '../NoteContext';


export default class FoldersNav extends Component {

  static contextType = NoteContext;


  render() {
    const {folders=[]} = this.context
    return (
        <div className="folderNav">
          <ul className="folderNav_list">
            {folders.map(folder => 
              <li key={folder.id}>
                <NavLink className='folderNav_Link'
                to={`/folder/${folder.id}`}>
                  {folder.name}
                </NavLink>
              </li>
              )}
          </ul>
          <div className="addNotes_button-wrapper">
            <Link to={'/add-folder'}> Add folder </Link>

          </div>
        </div>
        )
      }

}

FoldersNav.defaultProps = {
  folder: []
}
