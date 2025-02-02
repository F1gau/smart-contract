const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true }, // Продажа, Обмен, Покупка
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Владелец контракта
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' } // Статусы: активен, завершён и т.д.
});

const Contract = mongoose.model('Contract', contractSchema);
module.exports = Contract;
