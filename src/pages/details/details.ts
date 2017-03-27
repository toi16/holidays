import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Store} from '@ngrx/store';
import { AppState } from '../../services/app-state';
import { HolidayActions } from '../../actions/holiday.actions';
import * as moment from 'moment';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  public holiday: any = {};
  public isNew = true;
  public action = 'Add';
  public isoSDate = '';
  public isoEDate = '';
  public holDays = 0;
  public approved = false;
  public description = '';

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private store: Store<AppState>,
    private holidayActions: HolidayActions) {
  }

  ionViewWillEnter() {
    let editHoliday = this.navParams.get('holiday');
    
    if (editHoliday) {
      this.holiday = editHoliday;
      this.isNew = false;
      this.action = 'Edit';
      this.isoSDate = this.holiday.StartDate.toISOString().slice(0, 10);
      this.isoEDate = this.holiday.EndDate.toISOString().slice(0, 10);
    }
  }


  save() {
    this.holiday.StartDate = new Date(this.isoSDate);
    this.holiday.EndDate = new Date(this.isoEDate);

    if (this.isNew) {
      this.store.dispatch(this.holidayActions.addHoliday(this.holiday));
    }
    else {
      this.store.dispatch(this.holidayActions.updateHoliday(this.holiday));
    }

    this.dismiss();
  }

  delete() {
    this.store.dispatch(this.holidayActions.deleteHoliday(this.holiday));
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss(this.holiday);
  }
}
