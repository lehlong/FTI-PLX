import { Component } from '@angular/core'
import { ShareModule } from '../../shared/share-module'
import { GlobalService } from '../../services/global.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './incidentlogs.component.html',
  styleUrl: './incidentlogs.component.scss',
})
export class IncidentlogsComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Lịch sử thay đổi sự cố',
        path: 'system-manager/incidentlogs',
      },
    ])
  }
  keyWord: string = ''
  filter = {
    fromDate: "",
    issueNumber: "",
    pageNumber: 1,
    pageSize: 15,
    sort:"",
    sortProperty: "",
    toDate:"",
    userName: ""
  }
  dataSearch : any[] = [];
  ngOnDestroy() {
    this.globalService.setBreadcrumb([])
  }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    if (this.filter.fromDate != "") {
      var newFromDate = new Date(this.filter.fromDate)
      this.filter.fromDate = newFromDate.toISOString().slice(0, 10);
    }
    if (this.filter.toDate != "") {
      var newToDate = new Date(this.filter.toDate)
      this.filter.toDate = newToDate.toISOString().slice(0, 10);
    }

    this.http.post(environment.baseApiUrl + '/reports/issue', this.filter)
      .subscribe({
        next: (response: any) => {
          this.dataSearch = response.content;
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
reset(){
}

  // exportExcel() {
  //   return this._service
  //     .exportExcelCurrency(this.filter)
  //     .subscribe((result: Blob) => {
  //       const blob = new Blob([result], {
  //         type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //       })
  //       const url = window.URL.createObjectURL(blob)
  //       var anchor = document.createElement('a')
  //       anchor.download = 'danh-sach-loai-hang-hoa.xlsx'
  //       anchor.href = url
  //       anchor.click()
  //     })
  // }
}
