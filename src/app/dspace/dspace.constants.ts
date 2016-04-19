﻿import {Injectable} from 'angular2/core';

/**
 * Some constants.
 */
@Injectable()
export class DSpaceConstants {


    /**
     * Constant for recent items. This needs some redesigning.
     */

    recentitems =
    {
        'PATH': '/Items',
        'PLURAL': 'Items',
        'METHOD': 'RecentItems',
        'DSPACE': 'items'
    }

    /**
     * Constants for items
     */
    item = {
        'PLURAL': 'items',
        'PATH': '/Items',
        'COMPONENT': 'Items',
        'METHOD': 'Item',
        'DSPACE': 'items'
    };

    /**
     * Constants for collections
     */
    collection = {
        'PLURAL': 'collections',
        'PATH': '/Collection',
        'COMPONENT': 'Collections',
        'METHOD': 'Collection',
        'DSPACE': 'collections',
        'SUBTYPES': 'items'
    };

    /**
     * Constants for communities
     */
    community = {
        'PLURAL': 'communities',
        'PATH': '/Communities',
        'COMPONENT': 'Communities',
        'METHOD': 'Community',
        'DSPACE': 'subcommunities',
        'SUBTYPES': 'comcols'
    };

}