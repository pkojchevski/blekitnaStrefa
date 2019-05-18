import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DeleteService {

    private deleteSubject = new BehaviorSubject<boolean>(false);

    deleteObs$ = this.deleteSubject.asObservable();

    newValue(status: boolean) {
        return this.deleteSubject.next(status);
    }
}
