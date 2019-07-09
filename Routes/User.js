const express = require('express');
const router = express.Router();

// get list user.
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Get list user route'
  })
});

// get detail user.
router.get('/:id', (req, res, next) => {
  res.status(200).json({
    message: 'Get detail success'
  })
});

// Update
router.put('/:id', (req, res, next) =>　{

  res.status(200).json({
    message: 'Update success'
  })
});

// Update
router.delete('/:id', (req, res, next) =>　{
  res.status(200).json({
    message: 'Delete success'
  })
});


// Create.
router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Create success'
  })
});

module.exports = router;
