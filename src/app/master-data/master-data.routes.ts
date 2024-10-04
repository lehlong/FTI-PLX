import { Routes } from '@angular/router'

import { FunctionComponent } from './function/function.component'
import { TasklistComponent } from './tasklist/tasklist.component'
import { DeviceComponent } from './device/device.component'
export const masterDataRoutes: Routes = [
  { path: 'Function', component: FunctionComponent },
  { path: 'Tasklist', component: TasklistComponent },
  { path: 'Device', component: DeviceComponent },
]
