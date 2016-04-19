import {Component, Input} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {DSpaceDirectory} from '../../dspace.directory';

import {DSpaceService} from '../../dspace.service';

import {Item} from "../../models/item.model"


/**
 * Component that displays the bitstreams of an item in the simple-item-view
 * Download on click.
 * It gets the item bitstreams because I *think* that we could let the thumbnail download a bitstream?
 */
@Component({
    selector: 'item-thumbnail',
    inputs: ['itemBitstreams'],
    template:
        `<div id="thumbnail">
                <!-- for now just display no thumbnail -->
                     <a [attr.href]="" class="image-link">
                                <img src="../../../../../resources/images/NoThumbnail.svg">
                    </a>
         </div>
        `
})

export class ThumbnailComponent {


    private itemBitstreams : Object;

    constructor(private params: RouteParams,private directory: DSpaceDirectory)
    {
    }


}
