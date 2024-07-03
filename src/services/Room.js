import NotFound from '../errors/notFoundError.js';
import Model from '../models/Room.js';

class Room {
  static async create(info) {
    const room = new Model({
      name: info.name,
      colorID: info.colorID,
    });

    await room.save();
    return room;
  }

  static async readAll() {
    const rooms = await Model.find();

    return rooms;
  }

  static async readById(id) {
    const room = await Model.findById(id);
    if (!room) throw new NotFound('Room not found!');

    return room;
  }

  static async update(id, { name, colorID }) {
    const room = await Room.readById(id);

    if (name) room.set('name', name);
    if (colorID) room.set('colorID', colorID);

    await room.save();
    return room;
  }

  static async delete(id) {
    const room = await Room.readById(id);
    await room.deleteOne();

    return room;
  }
}

export default Room;
