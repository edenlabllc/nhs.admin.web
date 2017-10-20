import { schema } from 'normalizr';

export const template = new schema.Entity('templates');
export const dictionary = new schema.Entity(
  'dictionaries',
  {},
  { idAttribute: 'name' }
);

export const clinic = new schema.Entity('clinics');
export const declaration = new schema.Entity('declarations');
export const employee = new schema.Entity('employees');
export const employeesRequest = new schema.Entity('employeesRequests');

export const globalStat = new schema.Entity('globalStat');
export const detailStat = new schema.Entity('detailStat');
export const declarationsStat = new schema.Entity('declarationsStat');

export const innm = new schema.Entity('innms');
export const innm_dosage = new schema.Entity('innm_dosages');
export const medication = new schema.Entity('medications');
export const medication_dispense = new schema.Entity('medication_dispenses');
export const medical_program = new schema.Entity('medical_programs');
export const program_medication = new schema.Entity('program_medications');
