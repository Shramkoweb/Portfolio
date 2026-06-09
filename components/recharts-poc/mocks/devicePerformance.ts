export interface DeviceSlice {
  name: string;
  value: number;
}

export const DEVICE_PERFORMANCE: DeviceSlice[] = [
  { name: 'Desktop', value: 89.7 },
  { name: 'Mobile', value: 10.3 },
];
