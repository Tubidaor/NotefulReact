
export const findFolder = (folders =[], folderId) =>
folders.find(folder => folder.id === folderId);

export const findNote = (notes=[], noteId) => 
notes.find(note => note.id === noteId);

export const getNotesForFolder = (notes=[], folder_id) => (
(!folder_id)
? notes
: notes.filter(note => note.folder_id === folder_id)
)

