// let database = require("../database");
let database = require("../models/userModel").database;
let { userModel } = require("../models/userModel");
let remindersController = {

  list: (req, res) => {
    if (req.user && req.user.role === 'admin'){
      res.redirect("/auth/admin");
    }
    else if(req.user && req.user.role === 'regular'){
    res.render("reminder/index", { reminders: req.user.reminders });
   } else{
    res.redirect('/auth/login');
   }
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    const userId = req.user.id;
    
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },
  create: (req, res) => {
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    const user = userModel.findById(req.user.id)
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    req.user.reminders.find(function (reminder) {
      if (reminder.id == reminderToFind) {
        reminder.title = req.body.title;
        reminder.description = req.body.description;
        reminder.completed = true ? req.body.completed === "true" : false;
        return reminder.id
      }
    });
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    // implementation here 👈
    let reminderToFind = req.params.id;
    let index = req.user.reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });
    req.user.reminders.splice(index, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
