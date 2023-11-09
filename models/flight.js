const mongoose = require("mongoose");

const Schema = mongoose.Schema;

function validateValue(value) {
  return value >= 10 && value <= 9999;
}


const destinationSchema = new Schema ({
  arrivalAirport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
  },
  arrivalDate: {
    type: Date,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
})

const flightSchema = new Schema(
  {
    airline: {
      type: String,
      enum: ['American', 'Southwest', 'United', 'Emirates', 'Qatar', 'Spirit', 'Frontier', 'Hawaiian', 'Delta', 'Alaska', 'jetBlue']
    },
    airport: {
      type: String,
      enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
      default: "DEN",
    },
    flightNo: {
      type: Number,
      required: true,
      validate: [validateValue, "Value must be between 10 and 9999"],
    },
    departs: {
      type: Date,
      default: function () {
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        return oneYearFromNow;
      },
    },
    destination: [destinationSchema]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);
