const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");
const Order = require("../models/orden");

// {
//   "clientName": "Juan",
//     "date": "1/5/2021",
//     "typeWork":"viaje",
//     "detail": "puerta puerta",
//     "observaciones": "algo",
//     "price": 100
//   }

// {
//   "name":"juan",
//   "tel":"21312321",
//   "email":"juan@mail.com",
//   "adress": "ddasdas 200"
// }

router.get("/:route", function (req, res) {
  if (req.params.route === "contacts") {
    Contact.find(function (err, contacts) {
      res.json(contacts);
    });
  } else if (req.params.route === "orders") {
    Order.find(function (err, orders) {
      res.json(orders);
    });
    Order.counterReset("order_seq", function (err) {
      // Now the counter is 0, during development and when is working disable this fuction
      //or everytime you do the get to the api it will reset de orders index
    });
  }
});

router.post("/:route", function (req, res) {
  if (req.params.route === "contacts") {
    let contact = new Contact(req.body);
    contact
      .save()
      .then((contact) => {
        res.send(contact);
      })
      .catch(function (err) {
        res.status(422).send("Contact add failed");
      });
  } else if (req.params.route === "orders") {
    let order = new Order(req.body);
    order
      .save()
      .then((order) => {
        res.send(order);
      })
      .catch(function (err) {
        res.status(422).send("Order add failed");
      });
  }
});


//con este get obtengo un documento en especifico de la base de datos
router.get("/:route/:id", function (req, res) {
  if (req.params.route === "contacts") {
    Contact.findById(req.params.id, function (err, contact) {
      if (!contact) {
        res.status(404).send("No result found");
      } else {
        res.json(contact);
      }
    });
  } else if (req.params.route === "orders") {
      Order.findById(req.params.id, function (err, order) {
        if (!order) {
          res.status(404).send("No result found");
        } else {
          res.json(order);
        }
      });
  }
});


//con este get obtengo un subdocumento adentro del documento pricipal en este caso seria las ordenes de trabajo
router.get("/:route/:id/:work",function (req,res){
  if (req.params.route === "orders") {
    Order.findById(req.params.id, function (err, order) {
      if (!order) {
        res.status(404).send("No result found");
      } else {
        const work = order.worksArray.id(req.params.work);
        res.json(work);
      }
    });
  } ;
});

router.patch("/:route/:id", function (req, res) {
  if (req.params.route === "contacts") {
    Contact.findByIdAndUpdate(req.params.id, req.body)
      .then(function () {
        res.json("Contact updated");
      })
      .catch(function (err) {
        res.status(422).send("Contact update failed.");
      });
  } else if (req.params.route === "orders") {
    Order.findByIdAndUpdate(req.params.id, req.body)
      .then(function () {
        res.json("Order updated");
      })
      .catch(function (err) {
        res.status(422).send("Order update failed.");
      });
  }
});

router.delete("/:route/:id", function (req, res) {
  if (req.params.route === "contacts") {
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
  } else if (req.params.route === "orders") {
    Order.findById(req.params.id, function (err, order) {
      if (!order) {
        res.status(404).send("Order not found");
      } else {
        Order.findByIdAndRemove(req.params.id)
          .then(function () {
            res.status(200).json("Order deleted");
          })
          .catch(function (err) {
            res.status(400).send("Order delete failed.");
          });
      }
    });
  }
});

module.exports = router;
