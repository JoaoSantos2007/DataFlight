import Service from '../services/Room.js';

class Room {
  static async create(req, res, next) {
    try {
      const info = req.body;
      const room = await Service.create(info);

      return res.status(201).json({ success: true, created: true, room });
    } catch (err) {
      return next(err);
    }
  }

  static async read(req, res, next) {
    try {
      const id = req.params?.id;

      if (id) {
        const room = await Service.readById(id);
        return res.status(200).json({ success: true, room });
      }

      const rooms = await Service.readAll();
      return res.status(200).json({ success: true, rooms });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const info = req.body;

      const room = await Service.update(id, info);
      return res.status(200).json({ success: true, updated: true, room });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const room = await Service.delete(id);
      return res.status(200).json({ success: true, deleted: true, room });
    } catch (err) {
      return next(err);
    }
  }
}

export default Room;
