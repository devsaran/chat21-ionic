import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export abstract class PresenceService {

  // BehaviorSubject
  abstract BSIsOnline: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  abstract BSLastOnline: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // params
  // abstract tenant = environment.tenant;

  private _tenant: string;
  public setTenant(tenant): void {
    this._tenant = tenant;
    console.log('FIREBASE-PRESENCE (PRESENCE.SERV) this.tenant', this._tenant);
  }
  public getTenant(): string {
    if (this._tenant) {
      return this._tenant;
    } 
  }

  // functions
  abstract initialize(): void;
  abstract userIsOnline(userid: string): Observable<any>
  abstract lastOnlineForUser(userid: string): void;
  abstract setPresence(userid: string): void;
  abstract removePresence(): void;
}
