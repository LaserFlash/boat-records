import { Component, OnInit } from '@angular/core';
import { incidentForm } from '../../../../environments/environment'

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.component.html',
  styleUrls: ['./report-incident.component.css']
})
export class ReportIncidentComponent implements OnInit {

  protected formURL = incidentForm

  constructor() { }

  ngOnInit() {
  }

}
