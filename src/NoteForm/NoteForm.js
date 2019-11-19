import React from 'react';
import PropTypes from 'prop-types';
import './NoteForm.css';

export default function NoteForm(props) {

    const { className, ...otherProps } = props
    return (
      <form
        className={['Noteful-form', className].join('')}
        action="#"
        {...otherProps}
      />
    );
}

NoteForm.propTypes = {
  props: PropTypes.object
}
