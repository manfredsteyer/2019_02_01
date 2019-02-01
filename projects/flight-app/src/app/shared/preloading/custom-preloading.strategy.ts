import { PreloadingStrategy, Route } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, switchMap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        return of(true).pipe(delay(0), switchMap(_ => fn()));
    }
}