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

  static async update(id, {
    name, type, value, roomID, mqttID,
  }) {
    const device = await Device.readById(id);

    if (name) device.set('name', name);
    if (type) device.set('type', type);
    if (value) device.set('value', value);
    if (roomID) device.set('roomID', roomID);
    if (mqttID) device.set('mqttID', mqttID);

    await device.save();
    return device;
  }

  static async delete(id) {
    const device = await Device.readById(id);
    await device.deleteOne();

    return device;
  }
}

export default Device;
