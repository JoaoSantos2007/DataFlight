import Model from '../models/Room.js';
import DeviceModel from '../models/Device.js';
import randomID from '../utils/randomID.js';

class roomController {
  // Create room
  static createRoom(req, res) {
    const data = req.body;

    Model.create({
      id: !data.id ? randomID() : data.id,
      name: data.name,
      colorID: data.colorID,
    })
      .then((room) => {
        res.status(201).json({
          created: true,
          room,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  // Read rooms
  static getRooms(req, res) {
    const { id } = req.params;

    if (id) {
      DeviceModel.findAll({
        where: {
          roomID: id,
        },
      })
        .then((devices) => {
          const room = req.room.toJSON();

          room.devices = devices;

          res.status(200).send(room);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } else {
      Model.findAll()
        .then((rooms) => {
          res.status(200).json(rooms);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  }

  // Update room
  static updateRoom(req, res) {
    const { room } = req;
    const data = req.body;

    room.update({
      name: data.name,
      colorID: data.colorID,
    })
      .then((room) => {
        res.status(200).json({
          updated: true,
          room,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  // Delete room
  static deleteRoom(req, res) {
    const { room } = req;

    room.destroy()
      .then(() => {
        res.status(200).json({
          deleted: true,
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

export default roomController;
