import React, { useState } from "react";
import NoteContext from "./NotesContext";
const host=process.env.REACT_APP_BACKEND_HOST;
const NoteState= (props)=>{
    const notesInitial=[
        
    ];
    const getNotes=async()=>{
        // console.log("add it")
        let url=`${host}/api/notes/fetchAllNotes`;
        // console.log(localStorage.getItem('token'))
        const response = await fetch(url, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
    
          });
          const json = await response.json();
          // console.log(json)
          setNotes(json)
        
    }
    const [notes, setNotes] = useState([])
    const addNote=async(title, description,tag)=>{
        // console.log("add it")
        let url=`${host}/api/notes/addNote/`;
        const response = await fetch(url, {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}),
          });
          const json=await response.json();
         
        setNotes(notes.concat(json));
    }
    const deleteNote=async(id)=>{
        // console.log(id)
        let url=`${host}/api/notes/deleteNote/${id}`;
        const response = await fetch(url, {
            method: "DELETE", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          const json=await response.json();
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    const updateNote=async(id,title,description,tag)=>{
        let url=`${host}/api/notes/updateNote/${id}`;
        const response = await fetch(url, {
            method: "PUT", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title,description,tag}),
          });
          const json= await response.json();
          let newNotes=await JSON.parse(JSON.stringify(notes));
        for(let i=0;i<newNotes.length;i++){
            if(newNotes[i]._id===id){
                newNotes[i].title=title;
                newNotes[i].description=description;
                newNotes[i].tag=tag;
              break;
            }
        }
        setNotes(newNotes)
    }
    return (
        <NoteContext.Provider value={{notes,getNotes,addNote,deleteNote,updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;