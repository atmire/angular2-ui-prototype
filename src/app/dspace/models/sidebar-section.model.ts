import * as hash from 'object-hash';
import { Equatable} from "../../utilities/lang/equatable.interface";
import { Hashable } from "../../utilities/lang/hashable.interface";
import { ObjectUtil } from '../../utilities/commons/object.util';

/**
 * A class representing a sidebar section
 *
 * Implements the hashable interface:
 *  SidebarSection objects with the same attributes will have an identical hashcode
 *
 * Implements the equatable interface:
 *  SidebarSection objects can be compared with the equals() method
 *  two sidebarsection objects with the same hashcode are equal
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
     * The route of this component as it appears in the router
     * If this does not match the name in the router, Angular2 will throw an error.
     */
    route: string = null;


    /**
     *
     */
    routeid : number = null;


    /**
     * The childsections this section contains
     * @type {any[]}
     */
    childsections : Array<SidebarSection> = new Array<SidebarSection>(); // children of this model.




    /**
     *
     */
    constructor()
    {
    }


    /**
     * Add a childsection
     * @param child
     */
    addChild(child : SidebarSection)
    {
        this.childsections.push(child);
    }


    /**
     *
     * @returns {Builder}
     */
    static getBuilder() : Builder
    {
        return new Builder();
    }



    // interface methods


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
     * @param other
     * @returns {boolean}
     */
    equals(other: SidebarSection) : boolean{
        return ObjectUtil.hasValue(other) && this.hashCode() === other.hashCode();
    }

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
     * @param name
     * @param url
     * @returns {Builder}
     */
    route(route : string) : Builder
    {
        this.section.route = route;
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
     * @param id
     * @returns {Builder}
     */
    routeid(id : number) : Builder
    {
        this.section.routeid = id;
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
     * @returns {SidebarSection}
     */
    build() : SidebarSection
    {
        return this.section;
    }
}