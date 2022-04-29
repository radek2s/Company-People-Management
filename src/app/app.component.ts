import { Component } from '@angular/core';
import DataSourceService, { DataSourceState } from './services/datasources';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  status: DataSourceState

  constructor(private datasource: DataSourceService) {
    this.status = DataSourceState.NOT_AVAILABLE;
    this.datasource.getConnectionState().subscribe(state => {
      this.status = state
    })
  }
}
