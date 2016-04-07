﻿import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES, Location, RouteConfig} from 'angular2/router';

import {DSpaceDirectory} from './dspace/dspace.directory';

import {TreeComponent} from './navigation/tree.component';
import {ContextComponent} from './navigation/context.component';
import {BreadcrumbService} from './navigation/breadcrumb.service';
import {TranslateService, TranslatePipe} from "ng2-translate/ng2-translate";

/**
 * The dashboard component is the main index for browsing. Layout contains a 
 * sidebar context along with the community/collection/item tree.
 */
@Component({
    selector: "directory",
    pipes: [TranslatePipe],
    directives: [TreeComponent, ContextComponent],
    template: `
                <div class="container">
                    <div class="col-md-4">
                        <context [context]="dashboard"></context>
                    </div>
                    <div class="col-md-8">
                        <tree [directories]="dspace.directory | async"></tree>
                    </div>
                </div>
              `
})
export class DashboardComponent {

    /**
     * Object to resemble the dashboard breadcrumb.
     */
    private dashboard: {
        name: string,
        type: string
    };

    /**
     *
     * @param dspace 
     *      DSpaceDirectory is a singleton service to interact with the dspace directory.
     * @param breadcrumb
     *      BreadcrumbService is a singleton service to interact with the breadcrumb component.
     */
    constructor(private dspace: DSpaceDirectory,
                private breadcrumb: BreadcrumbService,
                translate: TranslateService ){

        this.dashboard =
        {
            name: 'Dashboard',
            type: 'dashboard'
        };
        breadcrumb.visit(this.dashboard);
        translate.setDefaultLang('en');
        translate.use('en');
    }

    /**
     * Method provided by Angular2. Invoked after the constructor.
     */
    ngOnInit() {
        this.dspace.loadDirectory();
    }

}