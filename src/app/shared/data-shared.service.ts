import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class DataSharedService {
    private _dataSource = new Subject<boolean>();
    data$ = this._dataSource.asObservable();
    private _userData = new Subject<boolean>();
    userData$ = this._userData.asObservable();
    private _karmaPointSource = new Subject<boolean>();
    karmaPoint$ = this._karmaPointSource.asObservable();
    private _karmaPoint = new Subject<number>();
    constructor() { }

    sendData(message: boolean) {
        this._dataSource.next(message);
    }
    
    sendUserData(message:boolean){
        this._userData.next(message);
    }
    karmaPoint(karmaPoint:boolean){
        this._karmaPointSource.next(karmaPoint)
    }

}