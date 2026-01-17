const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    destination: { type: String, required: true },
    startDate: Date,
    endDate: Date,

    itinerary: [
      {
        day: Number,
        activity: String
      }
    ],

    packingList: [
      {
        item: String,
        packed: { type: Boolean, default: false }
      }
    ],

    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trip', tripSchema);
