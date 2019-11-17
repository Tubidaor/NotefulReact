import React from 'react';
import PropTypes from 'prop-types';

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
