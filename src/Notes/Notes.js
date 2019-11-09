import React, { Component } from 'react';

import {Link} from 'react-router-dom';

export default function Notes(props) {

    return (
      <div className="Note">
        <h2 className='noteTitle'>
          <Link to={`/note/${props.id}`}>
            {props.name}
          </Link>
        </h2>
        <div className="note_dates">
          <div className="note_modified">
            Modified
            {''}
            <span className="date">
              {props.modified}
            </span>
          </div>
        </div>
      </div>
    )
}

