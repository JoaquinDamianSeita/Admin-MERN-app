const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);

const ordenSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientId: { type: mongoose.ObjectId, required: false }, //cuando se habilite hay que pasarle un id de mongoose
  date: { type: String, required: true },
  typeWork: { type: String, required: true },
  detail: { type: String, required: true },
  observaciones: { type: String, required: true },
  price: { type: Number, required: true },
  order: { type: Number },
});

ordenSchema.plugin(AutoIncrement, { id: "order_seq", inc_field: "order" });

module.exports = mongoose.model("Order", ordenSchema);
