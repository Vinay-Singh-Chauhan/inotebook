import React, { useContext } from 'react'
import NoteContext from "../context/notes/NotesContext";
const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const {deleteNote}=context;
    const {note,updateModalNote}=props;
  return (
    <div className='col-md-3'>
        <div className="card">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
    <p className="card-text">{note.description}.</p>
    <i className="fa-sharp fa-solid fa-trash me-5" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-regular fa-pen-to-square" onClick={updateModalNote}></i>
    {/* <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a> */}
  </div>
</div>
        
        
    </div>
  )
}

export default NoteItem