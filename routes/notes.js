const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const {body, validationResult} = require('express-validator')

// ROUTE 1: Get all notes using: GET "/api/notes/fetchallnotes". Requires auth
router.get('/fetchallnotes', fetchUser, async (req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error ocured!")
    }
})

// ROUTE 2: Adding notes using: POST "/api/notes/addnotes". Requires auth
router.post('/addnotes', fetchuser, [
    body('title', 'Title is too short!').isLength({min: 3}),
    body('description', 'Description is too short!').isLength({min: 5}),
], async (req, res)=>{
    try{
        const {title, description, tag} = req.body
        // If errors, return that request and errors
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json(savedNote)

    } catch (error){
        console.error(error.message)
        res.status(500).send("Internal server error ocured!")
    }
})

// ROUTE 3: Updating notes using: PUT "/api/notes/updatenotes". Requires auth
router.put('/updatenotes/:id', fetchuser, async (req, res)=>{
    try {
    const {title, description, tag} = req.body
    // Create new Note object
    const newNote = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    // Find note to be updated
    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Not found!")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed!")
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error ocured!")
    }
})

// ROUTE 4: Deleting notes using: DELETE "/api/notes/deletenotes". Requires auth
router.delete('/deletenotes/:id', fetchuser, async (req, res)=>{
    try {
        
   
    // Find note to be deleted
    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(404).send("Not found!")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed!")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"SUCCESS:":"Note has been deleted!"})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error ocured!")
    }
})

module.exports = router