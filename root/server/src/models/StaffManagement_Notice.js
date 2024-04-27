const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  noticeID: { type: String, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  expirationDate: { type: Date, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

// Define a custom function to generate the noticeID in the format "A1", "A2", etc.
noticeSchema.pre('save', async function (next) {
  if (!this.noticeID) {
    const Notice = mongoose.model('Notice'); // Reference the model directly
    const lastNotice = await Notice.findOne({}, {}, { sort: { 'noticeID': -1 } });
    if (lastNotice) {
      const lastNumber = parseInt(lastNotice.noticeID.slice(1));
      this.noticeID = `A${lastNumber + 1}`;
    } else {
      this.noticeID = 'A1';
    }
  }
  next();
});

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;

