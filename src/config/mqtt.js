/* eslint-disable no-console */
import mosquitto from 'mqtt';
import { MQTT_PASSWORD, MQTT_URL, MQTT_USER } from '../utils/env.js';

const clientId = 1;

const mqtt = mosquitto.connect(MQTT_URL, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: MQTT_USER,
  password: MQTT_PASSWORD,
});

mqtt.on('error', (err) => {
  console.error(err);
});

// Connected!
mqtt.on('connect', () => {
  console.log('Connection estabilished with mqtt');

  mqtt.subscribe('global2', (err) => {
    if (err) {
      console.error(err);
    }
  });
});

export default mqtt;
