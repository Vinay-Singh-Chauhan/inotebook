import React, { useContext, useState } from 'react'
import NoteContext from "../context/notes/NotesContext";
const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote}=context;
    const handleAdd=(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({title:"",description:"",tag:""})
    }

    const [note, setNote] = useState({title:"",description:"",tag:""})
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <h1>Add Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
          name='title'
            type="text"
            className="form-control"
            id="title"
            required
            value={note.title}
            minLength={1}
            placeholder="Title"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <textarea
          name='description'
            className="form-control"
            id="description"
            rows="3"
            value={note.description}
            required
            minLength={1}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            name='tag'
            value={note.tag}
            id="tag"
            required
            minLength={1}
            placeholder="Tag"
            onChange={onChange}
          />
        </div>
        <button type="submit" disabled={note.title.length===0||note.description.length===0} onClick={handleAdd} className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  )
}

export default AddNote