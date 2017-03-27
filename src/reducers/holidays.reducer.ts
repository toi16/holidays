import { ActionReducer, Action } from '@ngrx/store';
import { HolidayActions } from '../actions/holiday.actions';

import { Holiday } from '../models/holiday';

export const HolidaysReducer: ActionReducer<Holiday[]> = (state: Holiday[] = [], action: Action) => {
  switch(action.type) {
    case HolidayActions.LOAD_HOLIDAYS_SUCCESS:
      return action.payload;
    case HolidayActions.ADD_UPDATE_HOLIDAY_SUCCESS:
      var exists = state.find(holiday => holiday._id === action.payload._id);

      if (exists) {
        //UPDATE
        return state.map(holiday => {
          return holiday._id === action.payload._id ? Object.assign({}, holiday, action.payload) : holiday;
        });
      }
      else {
        //ADD
        return [...state, Object.assign({}, action.payload)];
      }
    case HolidayActions.DELETE_HOLIDAY_SUCCESS:
      return state.filter(holiday => holiday._id !== action.payload.id);
    default:
      return state;
  };
}
