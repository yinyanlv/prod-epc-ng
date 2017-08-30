import {Component, OnInit, ViewEncapsulation} from "@angular/core";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'header-search',
    templateUrl: './search.html',
    styleUrls: ['./search.scss']
})
export class SearchComponent implements OnInit {

    ngOnInit() {

    }
}
