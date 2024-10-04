import { Routes } from '@angular/router'
import { UpdateIndexPerformanceComponent } from './update-index-performance/update-index-performance.component'
import { IndexPerformanceComponent } from './index-performance/index-performance.component'
import { IntergateIndexPerformanceComponent } from './intergate-index-performance/intergate-index-performance.component'

export const performanceRoutes: Routes = [
  { path: 'UpdateIndexPerformance', component: UpdateIndexPerformanceComponent },
  { path: 'IndexPerformance', component: IndexPerformanceComponent },
  { path: 'IntergateIndexPerformance', component: IntergateIndexPerformanceComponent },
]
