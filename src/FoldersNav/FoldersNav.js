import React, { Component } from 'react';
import './FoldersNav.css'
import { NavLink , Link } from 'react-router-dom';
import NoteContext from '../NoteContext';


export default class FoldersNav extends Component {

  static contextType = NoteContext;

  render() {
    const {folders=[]} = this.context
    return (
        <div className="NoteListNav">
          <ul className="NoteListNav__list">
            {folders.map(folder => 
              <li key={folder.id}>
                <NavLink className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}>
                  {folder.folder_name}
                </NavLink>
              </li>
              )}
          </ul>
          <div className="NoteListNav__button-wrapper">
            <Link to={'/add-folder'}>
              <button className='NoteListNav__add-folder-button' >
                Add folder 
              </button>
              </Link>

          </div>
        </div>
        )
      }

}

FoldersNav.defaultProps = {
  folder: []
}
