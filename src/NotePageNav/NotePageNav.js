import React from 'react';
import PropTypes from 'prop-types';
import './NotePageNav.css';


export default function NotePageNav (props) {
  return (
    <div className="NotePageNav">
      <button tag="button" onClick={() => props.history.goBack()}> go back </button>
      {props.folder && (<h3 className="NotePageNav_folder_name">
        {props.folder.folder_name}
      </h3>)}

    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}

NotePageNav.propTypes = {
  folder: PropTypes.string,
  history: PropTypes.object
}