﻿import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {TranslateService, TranslatePipe} from "ng2-translate/ng2-translate";

import {DSpaceDirectory} from '../dspace.directory';
import {BreadcrumbService} from '../../navigation/breadcrumb.service';
import {Collection} from "../models/collection.model";
import {ListComponent} from '../../navigation/list.component';
import {ContextComponent} from '../../navigation/context.component';
import {ContainerHomeComponent} from "./container-home.component";
import {PaginationComponent} from '../../navigation/pagination.component';

/**
 * Collection component for displaying the current collection.
 * View contains sidebar context and tree hierarchy below current collection.
 */
@Component({
    selector: 'collection',
    directives: [ListComponent, ContextComponent, ContainerHomeComponent],
    pipes: [TranslatePipe],
    template: ` 
                <div class="container" *ngIf="collection">

                    <div class="col-md-4">
                        <context [context]="collection"></context>
                    </div>  
                    
                    <div class="col-md-8">
                        <container-home [container]=collection></container-home>
                        <list [collection]="collection"></list>
                    </div>
                    
                </div>
              `
})
export class CollectionComponent {

    /**
     * An object that represents the current collection.
     */
    collection: Collection;

    /**
     *
     * @param params
     *      RouteParams is a service provided by Angular2 that contains the current routes parameters.
     * @param directory
     *      DSpaceDirectory is a singleton service to interact with the dspace directory.
     * @param breadcrumb
     *      BreadcrumbService is a singleton service to interact with the breadcrumb component.
     * @param translate
     *      TranslateService
     */
    constructor(private params: RouteParams, 
                private directory: DSpaceDirectory, 
                private breadcrumb: BreadcrumbService, 
                translate: TranslateService) {
        let page = params.get('page') ? params.get('page') : 1;
        directory.loadObj('collection', params.get('id'), page, params.get('limit')).then((collection:Collection) => {
            this.collection = collection;
            breadcrumb.visit(this.collection);
        });
        translate.setDefaultLang('en');
        translate.use('en');
    }

}

                    
                   