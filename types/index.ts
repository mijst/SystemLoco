export interface iModel {
  name: string;
  family: string;
  product: string;
}

export interface iDevice {
  id: string;
  name: string | null;
  model: iModel;
  lastReportTime: string;
  nextReportTime: string;
}

export interface iDeviceListResponse {
  results: iDevice[];
}
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
