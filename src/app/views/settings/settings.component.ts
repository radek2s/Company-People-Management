import { Component, OnInit } from "@angular/core";
import { DataSourceService } from "src/app/services/datasources/datasource.service";


@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    activeDB = "indexeddb";

    constructor(private service:DataSourceService) {
        
    }

    ngOnInit(): void {
        this.activeDB = this.service.getActiveDB();
    }

    selectDB() {
        this.service.initailize(this.activeDB);
    }
}