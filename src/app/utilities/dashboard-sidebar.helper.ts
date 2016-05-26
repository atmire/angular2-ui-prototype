import { Injectable, Inject } from '@angular/core';
import { SidebarSection } from '../dspace/models/sidebar/sidebar-section.model';
import { SidebarService } from './services/sidebar.service';
import { AuthorizationService } from '../dspace/authorization/services/authorization.service';
import { SidebarHelper } from './sidebar.helper';

/**
 * Class to populate the dashboard sidebar.
 */
@Injectable()
export class DashboardSidebarHelper extends SidebarHelper
{

    /**
     *
     * @type {boolean}
     */
    isAuthenticated : boolean = false;

    /**
     *
     * @param sidebarService
     *       SidebarService is a singleton service to interact with our sidebar
     * @param authorization
     *       AuthorizationService is a singleton service to interact with the authorization service.
     */
    constructor(@Inject(SidebarService) sidebarService : SidebarService,@Inject(AuthorizationService) private authorization : AuthorizationService)
    {
        super(sidebarService);
        console.log("created the dashboard-sidebar-helper");
    }


    /**
     * Populate the sidebar
     */
    populateSidebar()
    {

        this.isAuthenticated = this.authorization.isAuthenticated();
        console.log("Dashboard, authentication: " + this.isAuthenticated);

        let createComComponent = SidebarSection.getBuilder()
            .name("sidebar.context-dashboard.create-community")
            .id("createcommunity")
            .route("CommunityCreate")
            .build();


        let contextComponent = SidebarSection.getBuilder()
            .name("sidebar.context-dashboard.header")
            .id("appcontext")
            .visible(this.isAuthenticated)
            .visibilityObservable(this.authorization.userObservable)
            .addChild(createComComponent)
            .build();

        this.sidebarService.addSection(contextComponent);
        this.sections.push(contextComponent);
    }


}