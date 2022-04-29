import { Component, Input } from "@angular/core";
import { Location } from "src/app/models/entities";



@Component({
    selector: "location-info-card",
    templateUrl: "./location-card.component.html",
})
export class LocationInfoCardComponent {

    @Input() location!: Location;

}