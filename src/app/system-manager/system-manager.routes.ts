import {Routes} from '@angular/router';
import {AccountGroupIndexComponent} from './account-group/account-group-index/account-group-index.component';
import {RoleComponent} from './role/role.component';
import {AccountIndexComponent} from './account/account-index/account-index.component';
import {MenuComponent} from './menu/menu.component';
import {ProfileIndexComponent} from './profile/profile-index/profile-index.component';
import {ActionLogComponent} from './action-log/action-log.component';
import { DeviceConnectionListComponent } from './device-connection-list/device-connection-list.component';
import {SystemParameterComponent} from './system-parameter/system-parameter.component';
import { OrganizeComponent } from './organize/organize.component';
import { IncidentlogsComponent } from './incidentlogs/incidentlogs.component';
export const systemManagerRoutes: Routes = [
  {path: 'incidentlogs', component: IncidentlogsComponent},
  {path: 'account', component: AccountIndexComponent},
  {path: 'account-group', component: AccountGroupIndexComponent},
  {path: 'role', component: RoleComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'profile', component: ProfileIndexComponent},
  {path: 'action-log', component: ActionLogComponent},
  {path: 'device-connection', component: DeviceConnectionListComponent},
  {path: 'system-parameter', component: SystemParameterComponent},
  {path: 'organization', component: OrganizeComponent},
];
