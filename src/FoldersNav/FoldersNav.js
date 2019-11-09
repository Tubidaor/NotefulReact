import React, { Component } from 'react';
import './FoldersNav.css'
import Folders from '../Folders/Folders';
import { NavLink , Link } from 'react-router-dom';


export default function FoldersNav(props) {

    return (
      <div className="folderNav">
        <ul className="folderNav_list">
          {props.folders.map(folder => 
            <li key={folder.id}>
              <NavLink className='folderNav_Link'
              to={`/folder/${folder.id}`}>
                {folder.name}
              </NavLink>
            </li>
            )}
        </ul>
        <div className="addNotes_button-wrapper">
          <button> Add folder </button>

        </div>
      </div>
    );
}

FoldersNav.defaultProps = {
  folder: []
}
