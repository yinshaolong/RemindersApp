const express = require('express');
const router = express.Router();
const reminderController = require('../controller/reminder_controller');

// Define the routes for reminders
router.get('/', reminderController.list);
router.post('/', reminderController.create);
router.get('/new', reminderController.new);
router.get('/:id', reminderController.listOne);
router.post('/update/:id', reminderController.update);
router.post('/delete/:id', reminderController.delete);
router.get('/:id/edit', reminderController.edit);

module.exports = router;