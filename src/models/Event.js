import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const eventSchema = new Schema({
  humidity: {
    type: Number,
    required: [true, 'The humidity field is required!'],
  },
  temperature: {
    type: Number,
    required: [true, 'The temperature field is required!'],
  },
  heatIndex: {
    type: Number,
    required: [true, 'The heatIndex field is required!'],
  },
}, {
  timestamps: true,
});

const Event = db.model('events', eventSchema);

export default Event;
