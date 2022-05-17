import { Injectable } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

type IconVariants = 'outlined' | 'filled'

@Injectable({
    providedIn: 'root'
})
export class IconService {
    constructor(
        private matIconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer
    ) { 
        this.registerIcons()
    }

    private registerIcons(): void {
        this.load(Icons, '../assets/fluent')
        this.load(Icons, '../assets/fluent', 'outlined')
    }

    private load(icons: any, url: string, variant: IconVariants = 'filled'): void {
        const suffix = variant === 'filled' ? '' : `-${variant}`
        for (const [file, name] of Object.entries(icons)) {
            this.matIconRegistry.addSvgIcon(`${name}${suffix}`, this.sanitizer.bypassSecurityTrustResourceUrl(`${url}/${variant}/${file}.svg`))
        }
    }
}

// FileName - icon-name
const Icons = {
    Add:'add',
    AddCircle:"add-circle",
    Alert: 'alert',
    AppFolder: 'app-folder',
    Apps: 'apps',
    AppsList: 'apps-list',
    ArrowDown: 'arrow-down',
    ArrowDwonload: 'arrow-download',
    ArrowExpand: 'arrow-expand',
    Building: 'building',
    Call: 'call',
    Chat: 'chat',
    Checkmark: 'checkmark',
    CheckmarkCircle: 'checkmark-circle',
    ChevronDown: 'chevron-down',
    ChevronUp: 'chevron-up',
    City: 'city',
    Collections: 'collections',
    Comment: 'comment',
    Compose: 'compose',
    Cube: 'cube',
    Delete: 'delete',
    Desktop: 'desktop',
    Dismiss: 'dismiss',
    DismissCircle: 'dismiss-circle',
    Document: 'document',
    Drag: 'drag',
    Edit: 'edit',
    Folder: 'folder',
    FoodCake: 'cake',
    Glance: 'glance',
    GridDots: 'grid-dots',
    History: 'history',
    Home: 'home',
    Info: 'info',
    Layer: 'layer',
    Library: 'library',
    LinkSquare: 'link-square',
    Mail: 'mail',
    Map: 'map',
    MoreVertical: 'more-vertical',
    Note: 'note',
    Open: 'open',
    Options: 'options',
    People: 'people',
    PeopleAdd: 'people-add',
    PeopleAudience: 'people-audience',
    PeopleCommunity: 'people-community',
    PeopleTeam: 'people-team',
    Person: 'person',
    PersonAdd: 'person-add',
    Phone: 'phone',
    Ribbon: 'ribbon',
    Save: 'save',
    Search: 'search',
    SearchInfo: 'search-info',
    Send: 'send',
    Settings: 'settings',
    Share: 'share'
}