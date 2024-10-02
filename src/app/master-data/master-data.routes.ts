import { Routes } from '@angular/router'
import { CurrencyComponent } from './currency/currency.component'
import { UnitComponent } from './unit/unit.component'
import { LocalComponent } from './local/local.component'
import { AreaComponent } from './area/area.component'
import { OpinionTypeComponent } from './opinion-type/opinion-type.component'
import { PeriodTimeComponent } from './period-time/period-time.component'
import { AuditPeriodComponent } from './audit-period/audit-period.component'
import { MgListTablesComponent } from './mg-list-tables/mg-list-tables.component'
import { MgOpinionListComponent } from './mg-opinion-list/mg-opinion-list.component'
import { AccountTypeComponent } from './account-type/account-type.component'
import { TemplateListTablesComponent } from './template-list-tables/template-list-tables/template-list-tables.component'
import { ListTablesComponent } from '../business/list-tables/list-tables.component'
import { ListAuditComponent } from './list-audit/list-audit.component'
import { ListAuditEditComponent } from './list-audit/list-audit-edit/list-audit-edit/list-audit-edit.component'
import { TemplateListTablesPreviewComponent } from './template-list-tables-preview/template-list-tables-preview.component'
import { PreparingTemplateListTableComponent } from './preparing-template-list-table/preparing-template-list-table.component'
import { AuditPeriodListTablesComponent } from './audit-period-list-tables/audit-period-list-tables.component'

import { FunctionComponent } from './function/function.component'
export const masterDataRoutes: Routes = [
  { path: 'Function', component: FunctionComponent },
  { path: 'currency', component: CurrencyComponent },
  { path: 'unit', component: UnitComponent },
  { path: 'local', component: LocalComponent },
  { path: 'area', component: AreaComponent },
  { path: 'opinion-type', component: OpinionTypeComponent },
  { path: 'audit-year', component: PeriodTimeComponent },
  { path: 'template-list-tables', component: TemplateListTablesComponent },
  { path: 'audit-period', component: AuditPeriodComponent },
  { path: 'mg-list-tables', component: MgListTablesComponent },
  { path: 'mg-opinion-list', component: MgOpinionListComponent },
  { path: 'account-type', component: AccountTypeComponent },
  { path: 'list-audit', component: ListAuditComponent },
  { path: 'list-audit-edit/:code', component: ListAuditEditComponent },
  {
    path: 'template-list-tables-preview/:code',
    component: TemplateListTablesPreviewComponent,
  },
  {
    path: 'list-audit-edit/preparing-template-list-table/:code',
    component: PreparingTemplateListTableComponent,
  },
  {
    path: 'audit-period-list-tables',
    component: AuditPeriodListTablesComponent,
  },
 
]
