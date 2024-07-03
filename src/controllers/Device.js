import Service from '../services/Device.js';

class Device {
  static async create(req, res, next) {
    try {
      const info = req.body;
      const device = await Service.create(info);

      return res.status(201).json({ success: true, device });
    } catch (err) {
      return next(err);
    }
  }

  static async read(req, res, next) {
    try {
      const id = req.params?.id;

      if (id) {
        const device = await Service.readById(id);
        return res.status(200).json({ success: true, device });
      }

      const devices = await Service.readAll();
      return res.status(200).json({ success: true, devices });
    } catch (err) {
      return next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const info = req.body;

      const device = await Service.update(id, info);
      return res.status(200).json({ success: true, updated: true, device });
    } catch (err) {
      return next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params;

      const device = await Service.delete(id);
      return res.status(200).json({ success: true, deleted: true, device });
    } catch (err) {
      return next(err);
    }
  }
}

export default Device;
