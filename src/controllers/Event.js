import Service from '../services/Event.js';

class Event {
  static async create(req, res, next) {
    try {
      const info = req.body;
      const event = await Service.create(info);

      return res.status(201).json({ success: true, event });
    } catch (err) {
      return next(err);
    }
  }

  static async read(req, res, next) {
    try {
      const id = req.params?.id;

      if (id) {
        const event = await Service.readById(id);
        return res.status(200).json({ success: true, event });
      }

      const events = await Service.readMany();
      return res.status(200).json({ success: true, events });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const id = req.params?.id;
      const info = req.body;

      const event = await Service.update(id, info);
      return res.status(200).json({ success: true, event });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const id = req.params?.id;

      const event = await Service.delete(id);
      return res.status(200).json({ success: true, event });
    } catch (err) {
      return next(err);
    }
  }
}

export default Event;
