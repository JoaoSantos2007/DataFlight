import mongoose from 'mongoose';
import db from '../config/mongo.js';

const { Schema } = mongoose;

const eventSchema = new Schema({

});

const Event = db.model('events', eventSchema);

export default Event;
