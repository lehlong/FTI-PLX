import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { plantype } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pm003-a',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm003-a.component.html',
  styleUrl: './pm003-a.component.scss'
})
export class PM003AComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Kế hoạch BTBD/KĐHC tổng hợp',
        path: 'report/PM003A',
      },
    ])
  }
  __iwerk: any = localStorage.getItem('__iwerk')
  werk = JSON.parse(this.__iwerk)
  model = {
    werks: this.werk,
    codeplan: '',
    codeplanchild: '',
    tplnr: '',
    plantype: '',
    device: ''
    
  }
  lstSelectIndicator = plantype
  lstSelectWorkCenter: any;
  ngOnInit() {
    this.getWorkCenter();
   
  }

  exportData() {
   console.log('export')
  }
  getWorkCenter() {
    this.http.post(environment.baseApiUrl + `/entity?table_name=work_center&&wc=&&adrnr=&&werks=${this.werk}`, {})
      .subscribe({
        next: (response: any) => {
          this.lstSelectWorkCenter = response.gtWorkcenter.item
          this.lstSelectWorkCenter.forEach((item: { ktext: string; arbpl: any; }) => {
            item.ktext = `${item.arbpl} - ${item.ktext}`;
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
}