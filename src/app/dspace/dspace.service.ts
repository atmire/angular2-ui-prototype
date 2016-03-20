﻿import {EventEmitter, Injectable} from 'angular2/core';
import {Observable, Observer} from 'rxjs/Rx';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

import {HttpService} from '../utils/http.service';

@Injectable()
export class DSpaceService {

    private REST: string;

    private url: string;

    private store: {
        directory: {
            context: Object[],
            observer: Observer<Object[]>,
            loader: Function,
            loading: boolean,
            ready: boolean
        },
        community: {
            context: Object[],
            observer: Observer<Object[]>,
            loader: Function,
            loading: boolean,
            ready: boolean
        },
        collection: {
            context: Object[],
            observer: Observer<Object[]>,
            loader: Function,
            loading: boolean,
            ready: boolean
        },
        item: {
            context: Object,
            observer: Observer<Object>,
            loader: Function,
            loading: boolean,
            ready: boolean
        }
    };
    
    item: Observable<Object>;

    collection: Observable<Object[]>;

    community: Observable<Object[]>;

    directory: Observable<Object[]>;
    
    constructor(private httpService: HttpService) {

        let dspace = this;

        this.REST = '/rest';

        this.url = 'https://demo.dspace.org';
        
        this.store = {
            directory: {
                context: new Array<Object>(),
                observer: null,
                loader: this.loadDirectory,
                loading: false,
                ready: false
            },
            community: {
                context: new Array<Object>(),
                observer: null,
                loader: this.loadCommunity,
                loading: false,
                ready: false
            },
            collection: {
                context: new Array<Object>(),
                observer: null,
                loader: this.loadCollection,
                loading: false,
                ready: false
            },
            item: {
                context: new Object(),
                observer: null,
                loader: this.loadItem,
                loading: false,
                ready: false
            }
        };

        this.directory = new Observable(observer => this.store.directory.observer = observer).share();
        this.community = new Observable(observer => this.store.community.observer = observer).share();
        this.collection = new Observable(observer => this.store.collection.observer = observer).share();
        this.item = new Observable(observer => this.store.item.observer = observer).share();
        
    }


    loadDirectory() {
        console.log('loading directory')    
        this.fetchTopCommunities().subscribe(topCommunities => {
                    
                this.store.directory.context = topCommunities;

                this.store.directory.observer.next(this.store.directory.context);

                console.log(this.store.directory.context)

                this.store.directory.ready = true;
            },
            error => {
                console.error('Error: ' + JSON.stringify(error, null, 4));
            },
            () => {
                console.log('finished fetching top communities');
            }
        );

    }

    loadCommunity(id) {

    }

    loadCollection(id) {
    }

    loadItem(id) {

    }

    fetch(path) {
        return this.httpService.get({
            url: this.url + path + '?expand=parentCommunity,parentCollection'
        });
    }

    fetchTopCommunities() {
        return this.httpService.get({
            url: this.url + this.REST + '/communities/top-communities'
        });
    }


    fetchCommunitySubCommunities(communityId) {
        return this.httpService.get({
            url: this.url + this.REST + '/communities/' + communityId + '/communities'
        });
    }


    fetchCommunityCollections(communityId) {
        return this.httpService.get({
            url: this.url + this.REST + '/communities/' + communityId + '/collections'
        });
    }


    fetchItems(collection) {
        return this.httpService.get({
            url: this.url + this.REST + '/collections/' + collection.id + '/items'
        });
    }

    fetchItem(itemId) {
        return this.httpService.get({
            url: this.url + this.REST + '/items/' + itemId + '?expand=metadata,bitstreams'
        });
    }

    login(email, password) {
        this.httpService.post({
            url: this.url + this.REST + '/login',
            data: {
                email: email,
                password: password
            }
        }); 
    }

}
