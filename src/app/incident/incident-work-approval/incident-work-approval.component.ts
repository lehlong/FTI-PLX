import { Component } from '@angular/core'
import { ShareModule } from '../../shared/share-module'
import { GlobalService } from '../../services/global.service'
import { HttpClient } from '@angular/common/http'
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants'
import { environment } from '../../../environments/environment.prod'

@Component({
  selector: 'app-incident-work-approval',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './incident-work-approval.component.html',
  styleUrl: './incident-work-approval.component.scss',
})
export class IncidentWorkApprovalComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách sự cố phê duyệt',
        path: 'incident/IncidentWorkApproval',
      },
    ])
  }
  __iwerk: any = localStorage.getItem('__iwerk')
  werk = JSON.parse(this.__iwerk)
  __tplnr: any = localStorage.getItem('__tplnr')
  tplnr = JSON.parse(this.__tplnr)
  __activeRole: any = localStorage.getItem('__activeRole')
  role = JSON.parse(this.__activeRole)
  __activeIngpr: any = localStorage.getItem('__activeIngpr')
  ingqr = JSON.parse(this.__activeIngpr)
  model = {
    end_date: '9999-02-28',
    funcloc: this.tplnr,
    ingpr: this.ingqr,
    iwerk: this.werk,
    start_date: '2023-01-01',
  }
  dtable : any[] = []

  ngOnInit(){
this.getAll()
  }
  getAll(){
    ShowLoading()
    this.http.post(environment.baseApiUrl + `/issue_list/${this.tplnr}`,this.model)
      .subscribe({
        next: (response: any) => {
          this.dtable = response.itissues.item.filter((x: { zstatus: string }) => x.zstatus == 'Khởi tạo')
          HideLoading()
        },
        error: (error) => {
          console.error('Fail load:', error)
          HideLoading()
        },
      })
  }
  onCurrentPageDataChange($event : any){

  }
}
