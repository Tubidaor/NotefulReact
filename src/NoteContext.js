import React from 'react';

const NoteContext = React.createContext({
  notes: [],
  folders: [],
  addNote: () => {},
  deleteNote: () => {},
});

export default NoteContext