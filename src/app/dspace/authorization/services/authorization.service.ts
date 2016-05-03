import {Injectable, Inject} from 'angular2/core';
import {Response} from 'angular2/http';
import {Subject} from 'rxjs/Subject';
import {Observable} from "rxjs/Observable";

import {User} from '../../models/user.model';

import {DSpaceService} from '../../services/dspace.service';
import {StorageService} from '../../../utilities/services/storage.service';

/**
 * Authorization service used for authentication and authorization.
 */
@Injectable()
export class AuthorizationService {

    /**
     * Current logged in user.
     */
	private _user: User;

    /**
     * User subject.
     */
	private userSubject : Subject<User>;

    /**
     * User observable.
     */
    userObservable: Observable<User>;

	/**
     * @param storageService
     *      StorageService is a singleton service to interact with the storage service.
     * @param dspace
     *      DSpaceService is a singleton service to interact with the dspace service.
     */
    constructor(@Inject(StorageService) private storageService: StorageService,
                private dspace: DSpaceService) {
		this.userSubject = new Subject<User>();
        this.userObservable = this.userSubject.asObservable();
        
        //{
        //    let email = storageService.load('email');
        //    let token = storageService.load('token');
        //    if(email && token) {
        //        this.user = new User(email, token);
        //    }
        //}
        
    }

    /**
     * Login user with email and password.
     *
     * @param email
     *      User email.
     * @param password
     *      User password.
     */
    login(email: string, password: string): Observable<Response> {

    	let observableResponse: Observable<Response> = this.dspace.login(email, password);
    	
    	observableResponse.subscribe(response => {           
            if(response.status == 200) {
                let token = response.text();
                this.user = new User(email, token);

                //{
                //	this.storageService.store('email', email);
                //	this.storageService.store('token', token);
            	//}
            }
        },
        error => {
            
        });

        return observableResponse;
    }

    /**
     * Logout. Sets user to null. Perform other logout actions.
     */
    logout(): void {
    	this.user = null;
    	
    	//{
    	//	this.storageService.remove('email');
        //	this.storageService.remove('token');
    	//}
    }

    /**
     * Sets the currently logged in user.
     *
     * @param user
     *      User whom is currently logged in.
     */
    set user(user: User) {
    	this._user = user;
    	this.userSubject.next(this._user);
    }

    /**
     * Returns the logged in user.
     */
    get user(): User {
    	return this._user;
    }

}