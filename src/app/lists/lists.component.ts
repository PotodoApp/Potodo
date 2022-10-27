import {Component, OnInit} from '@angular/core';
import {ListsService} from "./lists.service";
import {IItem} from "./IItem";

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss']
})

export class ListsComponent implements OnInit {
    tempItems: any = [];

    constructor(private listService: ListsService) {
    }

    ngOnInit(): void {
    }
    items: IItem[] = this.listService.getListItems();

    title = 'Potodo';

    task: string = '';

    addName() {
        this.listService.addItem(this.task);
        this.task = '';
    }

}