
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Location } from "src/app/models/entities";
import DataSourceService from "src/app/services/datasources";


@Component({
    selector: "app-sites",
    templateUrl: "./locations.component.html"
})
export class LocationsComponent implements OnInit {

    locations!: Location[];

    constructor(
        private datasource: DataSourceService,
        private editorDialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getLocations()
    }

    async getLocations() {
        this.datasource.getAllLocations().then(r => {
            this.locations = r;
        })

    }

    addLocation() {
        
    }

    // addSite() {
    //     const dialogRef = this.editorDialog.open(SiteCreatorDialogComponent)

    //     dialogRef.afterClosed().subscribe(site => {
    //         if(!!site) {
    //             this.service.addSite(site);
    //         }
    //     })
    // }
    
}