import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const roomSchema = new Schema({
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
  colorID: {
    type: String,
    required: [true, 'The colorID field is required!'],
  },
});

const Room = db.model('rooms', roomSchema);

export default Room;
