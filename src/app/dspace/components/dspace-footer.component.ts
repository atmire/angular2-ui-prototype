import { Component } from '@angular/core';

import { TranslatePipe } from "ng2-translate/ng2-translate";

/**
 * Component for the authors of the simple-item-view.
 * This component gets a list of all metadata, and filters for the appropriate date to be shown.
 */
@Component({
    selector: 'dspace-footer',
    pipes: [TranslatePipe],
    template: `
                <footer>
                <div class="container">
                    <div class="row">
                        <div class="col-xs-7 col-sm-8">
                            <div>
                                <a target="_blank" href="http://www.dspace.org">DSpace software</a>
                                <span>copyright 2002-2016</span>
                                <a target="_blank" href="http://www.duraspace.org/">DuraSpace</a>
                            </div>

                            <div class="hidden-print">
                                <a href="#">Contact</a>
                                <span> | </span>
                                <a href="#">Send feedback</a>
                            </div>
                        </div>

                        <div class="col-xs-5 col-sm-4 hidden-print">
                            <div class="pull-right">
                                <span>Theme by</span>
                                <a href="http://www.dspace.org">DSpace</a>
                            </div>
                        </div>
                    </div>
                </div>
                </footer>
              `
})

/**
 *
 */
export class DspaceFooterComponent {


}
