import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { ABCIndicator } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-pm001',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm001.component.html',
  styleUrl: './pm001.component.scss'
})
export class PM001Component {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Bảng liệt kê khu vực chức năng',
        path: 'report/PM001',
      },
    ])
  }
  __iwerk : any = localStorage.getItem('__iwerk')
  werk = JSON.parse(this.__iwerk)
  __tplnr : any = localStorage.getItem('__tplnr')
  tplnr = JSON.parse(this.__tplnr)

  model = {
    werks: this.werk,
    beber: '',
    abckz: '',
    class: '',
    tplnr: '',
    fdate: new Date()
  }
  lstSelectIndicator = ABCIndicator
  lstSelectPlantSection = ABCIndicator
  lstSelectFunclocList : any;
  ngOnInit(){
    this.getFunclocList();
  }

  exportData(type: string){
    console.log(type, this.model)
  }

  getFunclocList(){
    this.http.get(environment.baseApiUrl + `/funcloc_list/${this.tplnr}`)
    .subscribe({
      next: (response: any) => {
        this.lstSelectFunclocList = response.funcloclist.item
        this.lstSelectFunclocList.forEach((item: { descript: string; funcloc: any; })=>{
          item.descript = `${item.funcloc} - ${item.descript}`;
        })
      },
      error: (error) => {
        console.error('Fail load:', error)
      },
    })
  }
}
