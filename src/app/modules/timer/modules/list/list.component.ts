import {Component, OnInit} from '@angular/core';
import {TimerService} from "../../timer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { IItem } from '../../../shared/interfaces/IItem';

@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    form: FormGroup;
    items: IItem[] = this.listService.getListItems();
    inputFocused: boolean = false;
    hoverItem: string = "";


    constructor(
        private listService: TimerService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            task: [null, [Validators.required,
                Validators.minLength(2),
                Validators.maxLength(256)]]
        });
    }

    ngOnInit(): void {
    }

    handleLabel(status: string): void {
        switch (status) {
            case "focus":
                this.inputFocused = true;
                break
            case "blur":
                this.inputFocused = false;
                break
        }
        this.applyVisual();
    }

    applyVisual() {
        const _focused = this.inputFocused;
        const _empty = this.form.get('task')?.value !== null && this.form.get('task')?.value !== "";

        return {
            'focused':  _focused || _empty
        }
    }

    removeTask(task: string) {
        this.listService.removeItem(task);
    }

    checkTask(id: string, content: boolean) {
        let _temp = this.listService.getItem(id);
        _temp.complete = content;
        this.listService.checkItem(id, _temp.complete)
    }

    isValid() {
        return this.form.get('task')!.valid
    }

    addTask() {
        if (this.form.valid) {
            this.listService.addItem(this.form.value);
            this.form.reset()
        }
    }

}