import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from 'src/app/models/entities';


@Component({
  selector: 'app-location-creator-dialog',
  templateUrl: './location-creator.component.html',
})
export class LocationCreatorDialogComponent {

    location: Location;

    constructor(
        private dialogReference: MatDialogRef<LocationCreatorDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data && data.location) {
            this.location = data.location;
        } else {
            this.location = new Location();
        }
    }

    onNoClick(): void {
        this.dialogReference.close();
    }
    
    onYesClick(): void {
        this.dialogReference.close(this.location);
    }

}
