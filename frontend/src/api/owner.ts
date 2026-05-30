import { api } from './client';
import type { Owner } from '../types';

export const getOwner = async (): Promise<Owner> => {
  const response = await api.get<{ owner: Owner }>('/owner');
  return response.data.owner;
};