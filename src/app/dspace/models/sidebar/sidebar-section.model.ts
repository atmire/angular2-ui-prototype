import * as hash from 'object-hash';
import { Equatable} from "../../../utilities/lang/equatable.interface";
import { Hashable } from "../../../utilities/lang/hashable.interface";
import { ObjectUtil } from '../../../utilities/commons/object.util';
import { User } from './../user.model';

/**
 * One SidebarSection is equal to one entry in the sidebar
 * This section can contain a Route, a URL, or neither.
 * When the Section contains neither a Route nor a URL, it's a "header" to the sidebar
 */
export class SidebarSection implements Hashable, Equatable<SidebarSection>
{
    // The class variables are set to null for hash

    /**
     * This string can be used to overwrite a component.
     */
    id : string =  null;

    /**
     * The order for which an item appears in the sidebar.
     * When a collision, we will see what the sort returns.
     */
    index : number = null;


    /**
     * Name of the component
     */
    componentName : string = null;

    /**
     * Boolean to toggle visibility
     * @type {boolean}
     */
    visible : boolean = true;


    /**
     * If one is passed, we want to observe this for changes
     */
    visibilityObserver : any;



    /**
     * The childsections this section contains
     * @type {any[]}
     */
    childsections : Array<SidebarSection> = new Array<SidebarSection>(); // children of this model.


    /**
     * Used by the startObserving method, because the logging in/out events generate two events per action
     * We want to avoid changing the visibility twice for one change to the authorization
     */
    lastObservedValue : any;



    /**
     * An array of the routes.
     * This may contain child-routers and routeparams
     */
    routes : Array<Route>;


    /**
     *
     */
    url : string;



    /**
     * Add a childsection
     * @param child
     */
    addChild(child : SidebarSection)
    {
        this.childsections.push(child);
    }

    /**
     * If an observable was provided, this will start observing it for changes.
     * Currently, the observable expected is a userObservable, so we can watch for authentication changes.
     * e.g, when a user is authenticated, we want to set the visibility of some elements to true/false depending
     * on whether or not they should be shown.
     */
    startObserving()
    {
        if(this.visibilityObserver != null)
        {
            this.visibilityObserver.subscribe(obs =>
            {
                // Well, this solution makes it a lot less usable.
                // need to implement something like 'ObjectUtil.equals' and make sure all models implement 'Equatable'
                // note: typescript does not support boolean ^ boolean
                if(obs instanceof User !== (this.lastObservedValue instanceof User))
                {
                    this.visible = !this.visible;
                    this.lastObservedValue = obs;
                }
            });
        }
    }

    // interface methods

    /**
     *
     */
    constructor()
    {
        this.routes = new Array<Route>()
    }

    /**
     *
     * @returns {Builder}
     */
    static getBuilder() : Builder
    {
        return new Builder();
    }

    /**
     * Returns a SHA1 hash of this object, provided by the object-hash library
     *
     * @returns {string}
     *      a SHA1 hash of this object
     */
    hashCode(): string {
        return hash(this);
    }


    /**
     * Returns true if the two sidebar-section models have the same hashcode
     * Their hashcode will be the same if the content of their class variables is identical.
     *
     * @param other
     * @returns {boolean}
     */
    equals(other: SidebarSection) : boolean{
        return ObjectUtil.hasValue(other) && this.hashCode() === other.hashCode();
    }

}


/**
 * A class to store the routing information for a section.
 */
class Route
{

    /**
     *
     * @param name
     *      the name of the route, as it appears in the RouteConfig
     * @param params
     *  params are the expected parameters for the given route, as they appear in the RouteConfig (e.g, an item ID, collection ID, ..)
     */
    constructor(public name : string, params?)
    {
        if(params!=null)
        {
            this.params = params;
        }
    }
    params : any[];
}


/**
 * A class to build a sidebar section
 */
class Builder
{

    /**
     *
     */
    private section : SidebarSection;

    /**
     *
     */
    constructor()
    {
        this.section = new SidebarSection();
    }

    /**
     *
     * @param id
     * @returns {Builder}
     */
    id(id : string) : Builder
    {
        this.section.id = id;
        return this;
    }

    /**
     *
     * @param name
     * @returns {Builder}
     */
    name(name : string) : Builder
    {
        this.section.componentName = name;
        return this;
    }

    /**
     *
     * @param index
     * @returns {Builder}
     */
    index(index : number) : Builder
    {
        this.section.index = index;
        return this;
    }

    /**
     *
     * @param visible
     * @returns {Builder}
     */
    visible(visible : boolean) : Builder
    {
        this.section.visible = visible;
        return this;
    }


    /**
     *
     * @param observable
     * @returns {Builder}
     */
    visibilityObservable(observable : any) : Builder
    {
        this.section.visibilityObserver = observable;
        return this;
    }

    /**
     *
     * @param child
     * @returns {Builder}
     */
    addChild(child : SidebarSection) : Builder
    {
        this.section.addChild(child);
        return this;
    }


    /**
     *
     * @param children
     * @returns {Builder}
     */
    addChildren(children : Array<SidebarSection>) : Builder
    {
        for(let child of children)
        {
            this.section.addChild(child);
        }
        return this;
    }


    /**
     *
     * @param name
     *      name is name of the route, as it appears in the RouteConfig
     * @param params
     *      params are the provided parameters expected for a given route, as they appear in the RouteConfig
     * @returns {Builder}
     */
    route(name : string, params?)
    {
        let childRoute = new Route(name,params);
        this.section.routes.push(childRoute);
        return this;
    }

    /**
     *
     * @param destination
     */
    url(destination : string) : Builder
    {
       this.section.url = destination;
        return this;
    }

    /**
     * Returns the sidebar section and starts the observable
     * @returns {SidebarSection}
     */
    build() : SidebarSection
    {
        this.section.startObserving(); // start the observable
        return this.section;
    }
}