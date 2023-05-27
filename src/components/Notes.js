import React, { useContext,useEffect,useRef,useState } from "react";
import NoteContext from "../context/notes/NotesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote"
import {useNavigate } from "react-router-dom";
const Notes = () => {
  const handleUpdate=async(e)=>{
    e.preventDefault()
   await updateNote(note.eid,note.etitle,note.edescription,note.etag)
    // console.log(note)
    refClose.current.click();
    // addNote(note.title,note.description,note.tag)
}

const [note, setNote] = useState({eid:"",etitle:"",edescription:"",etag:""})
const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
let navigate=useNavigate()
    const context = useContext(NoteContext);
    const {notes,getNotes,updateNote}=context;
    useEffect(() => {
      if(localStorage.getItem('token')){

        getNotes()
      }else{
        navigate("/signin")
      }
      // console.log("hmms")
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const updateModalNote=(currentNote)=>{
      ref.current.click();
      // console.log(currentNote)
      setNote({eid:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        }
  return (
    
    <><AddNote/>

<button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
          name='etitle'
            type="text"
            className="form-control"
            id="etitle"
            value={note.etitle}
            required
            minLength={1}
            placeholder="Title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <textarea
          value={note.edescription}
          name='edescription'
            className="form-control"
            id="edescription"
            rows="3"
            minLength={1}
            required
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
          value={note.etag}
            type="text"
            minLength={1}
            className="form-control"
            name='etag'
            id="etag"
            placeholder="Tag"
            onChange={onChange}
            required
          />
        </div>
        
      </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" disabled={note.etitle.length===0||note.edescription.length===0} onClick={handleUpdate}>Save changes</button>
      </div>
    </div>
  </div>
</div>
      <h1>Your Notes</h1>
    <div className="row">
    <div className="container">
      {notes.length===0 && 'No Notes to display'}
      </div>
        {notes.map((note)=>{
          return <NoteItem key={note._id} updateModalNote={()=>{updateModalNote(note)}} note={note} />;
        })}
    </div>
        </>
  )
}

export default Notes