import { schema } from 'normalizr';

export const template = new schema.Entity('templates');
export const dictionary = new schema.Entity('dictionaries', {}, { idAttribute: 'name' });

export const clinic = new schema.Entity('clinics');
