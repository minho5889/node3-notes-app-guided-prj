const fs = require('fs')
const chalk = require('chalk')
const log = console.log

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)
    debugger;

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        log(chalk.blue.inverse(`${title}`) + ' is now added to the notes!')
    } else {
        console.log(chalk.red.inverse`Note title taken!`)
    }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if(notes.length !== notesToKeep.length) {
    saveNotes(notesToKeep)
    log(chalk.magenta.inverse(`${title}`) + ' has been removed from the notes')
  } else {
    console.log(chalk.red.inverse`No note found!`)
  }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green.inverse`Your notes ---`)
    notes.forEach(note => console.log(note.title))
}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note) {
        log(chalk.magenta.inverse(`${note.title}`) + '\n' + chalk.magenta.inverse`---`)
        log(note.body)
        log(chalk.magenta.inverse(`End of the Note ---`))
    } else {
        log(chalk.red.inverse`no note found`)
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}