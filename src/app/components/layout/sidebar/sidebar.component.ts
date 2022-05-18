import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { IconService } from "src/app/services/icon.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent {

    constructor(
        private router: Router,
        private iconService: IconService
    ) { }

    public navigateTo(path: string):void {
        this.router.navigateByUrl(path);
    }

    public isActive(entry: string): string {
        if (entry === 'main' && this.router.url === '/') return 'active' 
        return this.router.url.includes(entry) ? 'active' : ''
        
    }

}