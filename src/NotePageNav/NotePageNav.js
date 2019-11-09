import React from 'react';


export default function NotePageNav (props) {
  return (
    <div className="NotePageNav">
      <button tag="button" onClick={() => props.history.goBack()}> go back </button>
      {props.folder && (<h3 className="NotePageNav_folder_name">
        {props.folder.name}
      </h3>)}

    </div>
  )
}

NotePageNav.defaultProps = {
  history: {
    goBack: () => {}
  }
}