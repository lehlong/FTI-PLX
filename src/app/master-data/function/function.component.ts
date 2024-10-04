import { Component } from '@angular/core'
import { ShareModule } from '../../shared/share-module'
import { GlobalService } from '../../services/global.service'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment.prod'
import { HideLoading, ShowLoading } from '../../shared/constants/loading.constants'
@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './function.component.html',
  styleUrl: './function.component.scss',
})
export class FunctionComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh sách khu vực chức năng',
        path: 'master-data/Function',
      },
    ])
  }
  __tplnr: any = localStorage.getItem('__tplnr');
  tplnr = JSON.parse(this.__tplnr);
  keyWord: string = ''
  data: any[] = [];
  dataSearch : any[] = [];
  ngOnDestroy() {
    this.globalService.setBreadcrumb([])
  }

  ngOnInit(): void {
    this.getAllData();
  }
  getAllData() {
    ShowLoading()
    this.http.get(environment.baseApiUrl + `/funcloc_list/${this.tplnr}`)
      .subscribe({
        next: (response: any) => {
          this.data = response.funcloclist.item;
          this.dataSearch = response.funcloclist.item;
          HideLoading()
        },
        error: (error) => {
          console.error('Fail load:', error)
          HideLoading();
        },
      })
  }
search(){
  this.dataSearch = this.keyWord == '' ? this.data : this.data.filter((x: { funcloc: string | string[]; descript: string | string[]; startupdate: string | string[] }) => x.funcloc.includes(this.keyWord)||x.descript.includes(this.keyWord)||x.startupdate.includes(this.keyWord))
}
reset(){
  this.dataSearch = this.data;
  this.keyWord = ''
}
onCurrentPageDataChange($event: any): void {

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
