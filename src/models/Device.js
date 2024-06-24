import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const deviceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name field is required!'],
    validate: {
      validator: (value) => {
        const nameLength = value.length;

        if (nameLength >= 3 && nameLength <= 50) return true;

        return false;
      },
      message: (props) => `The length of the name field must be between 3 and 50 characters. ${props.value.length} characters are not allowed!`,
    },
  },
  type: {
    type: String,
    required: [true, 'The type field is required!'],
  },
  value: {
    type: String,
    required: [true, 'The value field is required!'],
  },
  roomID: {
    type: String,
    required: [true, 'The roomID field is required!'],
  },
  mqttID: {
    type: String,
    required: [true, 'The mqttID field is required!'],
  },
}, { versionKey: false });

const Device = db.model('devices', deviceSchema);

export default Device;
