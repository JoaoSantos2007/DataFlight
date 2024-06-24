import NotFound from '../errors/notFoundError.js';
import Model from '../models/Device.js';

class Device {
  static async create(info) {
    const device = new Model({
      name: info.name,
      type: info.type,
      value: info.value,
      roomID: info.value,
      mqttID: info.mqttID,
    });

    await device.save();
    return device;
  }

  static async readAll() {
    const devices = await Model.find();

    return devices;
  }

  static async readById(id) {
    const device = await Model.findById(id);

    if (!device) throw new NotFound('Device not found!');

    return device;
  }
}

export default Device;
