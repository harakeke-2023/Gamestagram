import express from 'express'

import * as db from '../db/users'

const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then((results) => {
      res.json(results)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/:id', (req, res) => {
  db.getUsersById(Number(req.params.id))
    .then((results) => {
      res.json(results)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/add', (req, res) => {
  db.addUser(req.body)
    .then((results) => {
      res.json(results[0])
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.patch('/:id', (req, res) => {
  const id = req.params.id
  const photoUrl = req.body.photoUrl

  db.updateUserPhoto(+id, photoUrl)
    .then(() => {
      res.status(200).json({ message: 'Profile picture updated successfully' })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.get('/auth0/:id', (req, res) => {
  db.getUsersByAuthId(req.params.id)
    .then((results) => {
      res.json(results)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

export default router
