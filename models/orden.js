const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const workSchema = new mongoose.Schema({
  typeWork: { type: String, required: true },
  detail: { type: String, required: true },
  price: { type: Number, required: true },
})

const ordenSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientId: { type: mongoose.ObjectId, required: false }, //cuando se habilite hay que pasarle un id de mongoose
  date: { type: String, required: true },
  worksArray: [workSchema],
  observaciones: { type: String, required: true },
  order: { type: Number },
});

ordenSchema.plugin(AutoIncrement, { id: "order_seq", inc_field: "order" });

module.exports = mongoose.model("Order", ordenSchema);
