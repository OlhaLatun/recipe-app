import { Component } from "@angular/core";
import { LocalStorageService } from "../services/local-storage/local-storage.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent {
    result: any;

    constructor(private storage: LocalStorageService) {}

    saveToLocalStorage() {
        const data = 'olya'
        this.storage.setItem('item', data)
    }

    getFromLocalStorage() {
        this.result = this.storage.getItem('item1')
        console.log(this.result)
    }


}