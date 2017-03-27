import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Holiday } from '../models/holiday';
import PouchDB from 'pouchdb';

@Injectable()
export class HolidayService {
private db;

  constructor(private platform: Platform) { }

  initDB() : Promise<any> {
    return this.platform.ready()
                        .then(() => {
                          this.db = new PouchDB('holiday');
                        });
  }

  add(holiday: Holiday) : Promise<any> {
    return this.db.post(holiday);
  }

  update(holiday: Holiday) : Promise<any> {
    return this.db.put(holiday);
  }

  delete(holiday: Holiday) : Promise<any> {
    return this.db.remove(holiday);
  }

  getAll() : Observable<any> {
    return Observable.fromPromise(
      this.initDB()
          .then(() => {
            return this.db.allDocs({ include_docs: true });
          })
          .then(docs => {
            return docs.rows.map((row) => {
              row.doc.StertDate = new Date(row.doc.StartDate); //convert string to date
              row.doc.EndDate = new Date(row.doc.EndDate); //convert string to date
              return row.doc;
            });
          }));
  }

  getChanges(): Observable<any> {
    return Observable.create(observer => {
    // listen for changes on the database
    this.db.changes({ live:true, since: 'now', include_docs: true })
        .on('change', change => {
          change.doc.StartDate = new Date(change.doc.StartDate); //convert string to date
          change.doc.EndDate = new Date(change.doc.EndDate); //convert string to date
          observer.next(change.doc);
        });
  });
}
}
