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

  // Update Device
  static update(req, res) {
    const { device } = req;
    const data = req.body;

    device.update({
      name: data.name,
      type: data.type,
      value: data.value,
      roomID: data.roomID,
      mqttID: data.mqttID,
    })
      .then((device) => {
        res.status(200).json({
          updated: true,
          device,
        });
      }).catch((error) => {
        res.status(500).json(error);
      });
  }

  // Delete device
  static delete(req, res) {
    const { device } = req;

    device.destroy()
      .then(() => {
        res.status(200).json({
          deleted: true,
        });
      }).catch((error) => {
        res.status(500).json(error);
      });
  }
}

export default Device;
