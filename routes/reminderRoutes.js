const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require("../middleware/checkAuth");
const reminderController = require('../controller/reminder_controller');

// Define the routes for /reminder/
router.post('/', ensureAuthenticated, reminderController.create);
router.get('/new', ensureAuthenticated, reminderController.new);
router.get('/:id', ensureAuthenticated, reminderController.listOne);
router.post('/update/:id', ensureAuthenticated, reminderController.update);
router.post('/delete/:id', ensureAuthenticated, reminderController.delete);
router.get('/:id/edit', ensureAuthenticated,reminderController.edit);

module.exports = router;
