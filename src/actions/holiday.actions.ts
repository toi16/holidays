import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Holiday} from '../models/holiday';

@Injectable()
export class HolidayActions {

  static ADD_HOLIDAY = 'ADD_HOLIDAY';
  addHoliday(holiday: Holiday): Action {
    return {
      type: HolidayActions.ADD_HOLIDAY,
      payload: holiday
    }
  }

  static UPDATE_HOLIDAY = 'UPDATE_HOLIDAY';
  updateHoliday(holiday: Holiday): Action {
    return {
      type: HolidayActions.UPDATE_HOLIDAY,
      payload: holiday
    }
  }

  static DELETE_HOLIDAY = 'DELETE_HOLIDAY';
  deleteHoliday(holiday: Holiday): Action {
    return {
      type: HolidayActions.DELETE_HOLIDAY,
      payload: holiday
    }
  }

  static LOAD_HOLIDAYS_SUCCESS = 'LOAD_HOLIDAYS_SUCCESS';
  loadHolidaysSuccess(holidays: Holiday[]): Action {
    return {
      type: HolidayActions.LOAD_HOLIDAYS_SUCCESS,
      payload: holidays
    }
  }

  static ADD_UPDATE_HOLIDAY_SUCCESS = 'ADD_UPDATE_HOLIDAY_SUCCESS';
  addUpdateHolidaySuccess(holiday: Holiday): Action {
    return {
      type: HolidayActions.ADD_UPDATE_HOLIDAY_SUCCESS,
      payload: holiday
    }
  }

  static DELETE_HOLIDAY_SUCCESS = 'DELETE_HOLIDAY_SUCCESS';
  deleteHolidaySuccess(id: string): Action {
    return {
      type: HolidayActions.DELETE_HOLIDAY_SUCCESS,
      payload: id
    }
  }

}
