export interface ServiceRecord {
  id: string;
  vehicle: string;
  serviceType: string;
  cost: number;
  date: string;
  status: string;
  statusColor: string;
}

export interface CreateServiceRecordPayload {
  vehicle: string;
  serviceType: string;
  cost: number;
  date: string;
  status: string;
}
