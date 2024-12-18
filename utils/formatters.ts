import {iDevice} from '../types'

export const formatDeviceName = (device: iDevice): string => {
  return device.name || `${device.model.product} (${device.id.slice(-4)})`;
};
