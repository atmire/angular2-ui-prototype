import {Component, Input} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {TranslatePipe} from "ng2-translate/ng2-translate";

import {DSpaceDirectory} from '../dspace.directory';
import {DSpaceService} from '../dspace.service';

import {ListEntryComponent} from './item/list/list-entry.component';
import {Item} from '../models/item.model';

/**
 * Need to think of a way in which I can manage showing either 'all items' or 'most recent items', depending on the location where this item is inserted.
 */
@Component({
    selector: 'item-list',
    directives: [ListEntryComponent],
    inputs: ['items'],
    template:
        `
            <div *ngFor="#item of itemsWithInformation" id="list-entries" class="row">  <!-- for each item, we create an item-list-entry element -->
                <list-entry [item]="item"></list-entry>
            </div>
        `
})


/**
 * We can accept the incomming JSON form a higher component for the time being.
 * But this class will create and Object (Item) out of it, which will be used in the child components.
 * Similar approach to 'simple & full item-view'
 */
export class ItemListComponent {

    items : Item[];
    itemsWithInformation : Item[] = [];
    constructor(private directory: DSpaceDirectory)
    {

    }

    ngOnChanges() // run this at a better time?
    {
        console.log("something changes, clearly.");
        console.log(this.items);
        // process this items.

        if(this.items.length > 0)
        {

            for(let i : number = 0; i < this.items.length;i++)
            {
                // console.log(i + ": " + this.items[i].id);
            }

            this.items.forEach( (entry) => {
                this.directory.loadObj('item', entry.id,0).then(item => {
                    this.itemsWithInformation.push(item);
                });
            })

        }
    }



}