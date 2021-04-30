const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.get("/contacts", function (req, res) {
  Contact.find(function (err, contacts) {
    res.json(contacts);
  });
});

router.get("/contacts/:id", function (req, res) {
  Contact.findById(req.params.id, function (err, contact) {
    if (!contact) {
      res.status(404).send("No result found");
    } else {
      res.json(contact);
    }
  });
});

router.post("/contacts", function (req, res) {
  let contact = new Contact(req.body);
  contact
    .save()
    .then((contact) => {
      res.send(contact);
    })
    .catch(function (err) {
      res.status(422).send("Contact add failed");
    });
});

router.patch("/contacts/:id", function (req, res) {
  Contact.findByIdAndUpdate(req.params.id, req.body)
    .then(function () {
      res.json("Contact updated");
    })
    .catch(function (err) {
      res.status(422).send("Contact update failed.");
    });
});

router.delete("/contacts/:id", function (req, res) {
  Contact.findById(req.params.id, function (err, contact) {
    if (!contact) {
      res.status(404).send("Contact not found");
    } else {
      Contact.findByIdAndRemove(req.params.id)
        .then(function () {
          res.status(200).json("Contact deleted");
        })
        .catch(function (err) {
          res.status(400).send("Contact delete failed.");
        });
    }
  });
});

module.exports = router;
