// let database = require("../database");
let database = require("../models/userModel").database;
let { userModel } = require("../models/userModel");
// const fetch = require("node-fetch");


let remindersController = {
  imageGen: async (keyword) => {
    const unsplashURL = `https://api.unsplash.com/search/photos?page=1&query=${keyword}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(unsplashURL);
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.results.length);
    return data.results[randomIndex].urls.regular;
  },

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
  create: async (req, res) => {
    let reminder = {

      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
      keyword: req.body.keyword,
      banner: await remindersController.imageGen(req.body.keyword)
    };
    console.log(reminder.banner)
    console.log("in create reminders keyword", reminders.keyword)
    const user = userModel.findById(req.user.id)
    user.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find((reminder) => {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

 update: (req, res) => {
    let reminderToFind = req.params.id;
    console.log("body keyword", req.body.keyword)
    
    req.user.reminders.find(function (reminder) {
      if (reminder.id == reminderToFind) {
        reminder.title = req.body.title;
        reminder.description = req.body.description;
        reminder.keyword = req.body.keyword;
        reminder.completed = true ? req.body.completed === "true" : false;
        console.log("reminder: ", reminder)
        console.log("body keyword in update: ", reminder.keyword)
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
