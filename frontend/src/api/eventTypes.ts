import { api } from './client';
import type { EventType } from '../types';

export const listEventTypes = async (): Promise<EventType[]> => {
  const response = await api.get<{ eventTypes: EventType[] }>('/event-types');
  return response.data.eventTypes;
};

export const getEventType = async (eventTypeId: string): Promise<EventType> => {
  const response = await api.get<{ eventType: EventType }>(`/event-types/${eventTypeId}`);
  return response.data.eventType;
};

export const createEventType = async (eventType: Omit<EventType, 'id'>): Promise<EventType> => {
  const response = await api.post<{ eventType: EventType }>('/event-types', { eventType });
  return response.data.eventType;
};