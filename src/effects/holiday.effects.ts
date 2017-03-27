import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

import { HolidayService } from '../services/holiday.service';
import { Holiday } from '../models/holiday';
import { HolidayActions } from '../actions/holiday.actions';

@Injectable()
export class HolidayEffects {
    constructor(
        private action$: Actions,
        private db: HolidayService,
        private holidayActions: HolidayActions
    ) { }

    @Effect() addHoliday$ = this.action$
        .ofType(HolidayActions.ADD_HOLIDAY)
        .map<Action, Holiday>(toPayload) //need action to set type of object
        .mergeMap(holiday => this.db.add(holiday));

    @Effect() updateHoliday$ = this.action$
        .ofType(HolidayActions.UPDATE_HOLIDAY)
        .map<Action, Holiday>(toPayload)
        .mergeMap(holiday => this.db.update(holiday));

    @Effect() deleteHoliday$ = this.action$
        .ofType(HolidayActions.DELETE_HOLIDAY)
        .map<Action, Holiday>(toPayload)
        .mergeMap(holiday => this.db.delete(holiday));


    allHolidays$ = this.db.getAll()
        .map(holidays => this.holidayActions.loadHolidaysSuccess(holidays));

    changedHolidays$ = this.db.getChanges()
        .map(change => {
            if (change._deleted) {
                return this.holidayActions.deleteHolidaySuccess(change._id);
            }
                else {
                    return this.holidayActions.addUpdateHolidaySuccess(change);
                }
            });

    @Effect() getHolidays$ = Observable.concat(this.allHolidays$, this.changedHolidays$);
}
