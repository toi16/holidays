import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Store} from '@ngrx/store';
import { Observable } from 'rxjs/rx';
import { AppState } from '../../services/app-state';
import { Holiday } from '../../models/holiday';
import { DetailsPage } from '../details/details';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  public holidays: Observable<Holiday[]>;

  constructor(
    private nav: NavController,
    private store: Store<AppState>,
    private modalCtrl: ModalController) {

    this.holidays = this.store.select(state => state.holidays);
  }

  showDetail(holiday) {
    let modal = this.modalCtrl.create(DetailsPage, {holiday: holiday});
    modal.present();
  }

  showSetting(holiday) {
    let modal2 = this.modalCtrl.create(SettingsPage, {holiday: holiday});
    modal2.present();
  }
}
