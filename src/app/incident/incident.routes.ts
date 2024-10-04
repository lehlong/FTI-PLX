import { Routes } from '@angular/router'
import { IncidentWorkComponent } from './incident-work/incident-work.component'
import { CorrectOrderListComponent } from './correct-order-list/correct-order-list.component'
import { IncidentWorkApprovalComponent } from './incident-work-approval/incident-work-approval.component'
import { IncidentCreateComponent } from './incident-create/incident-create.component'
import { CloseIncidentComponent } from './close-incident/close-incident.component'

export const incidentRoutes: Routes = [
  { path: 'IncidentWork', component: IncidentWorkComponent },
  { path: 'CorrectOrderlist', component: CorrectOrderListComponent },
  { path: 'IncidentWorkApproval', component: IncidentWorkApprovalComponent },
  { path: 'IncidentCreate', component: IncidentCreateComponent },
  { path: 'CloseIncident', component: CloseIncidentComponent },
]
