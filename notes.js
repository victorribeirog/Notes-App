const fs = require('fs')
const chalk = require('chalk')


const getNotes = () => 'Your notes'

const addNote= (title,body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note)=> note.title === title)
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title === title
    // })
    const duplicateNote = notes.find((note)=>note.title===title)
    if(!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    }else{
        console.log(chalk.red.inverse('Note title taken'))
    }
    
}

const saveNotes =(notes)=>{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = ()=>{
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return[]
    } 
}

const removeNote =(title)=>{
    const notes = loadNotes()
    const notestoKeep = notes.filter((note)=>note.title !==title)
    // const notestoKeep = notes.filter(function(note){
    //     return note.title !== title
    // })

    if(notes.length > notestoKeep.length){
        console.log(chalk.green.inverse('Note Removed'))
    }else{
        console.log(chalk.red.inverse('No note found'))
    }
    saveNotes(notestoKeep)
}

const listNotes = ()=>{
    const notes = loadNotes()
    console.log(chalk.blue.inverse('Your notes'))
    notes.forEach(note => { console.log(note.title)})
}

const readNotes=(title)=>{
    const notes = loadNotes()
    const notesToRead = notes.find((note => note.title === title))
    if(notesToRead){
        console.log(chalk.inverse(notesToRead.title))
        console.log(notesToRead.body)
    }else{
        console.log(chalk.red.inverse('Note not found'))
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote :removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}