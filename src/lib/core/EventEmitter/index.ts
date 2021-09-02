import nodeEvents from 'events';
import * as myEvents from './events';

export const events = myEvents;
export const ee = new nodeEvents.EventEmitter();
