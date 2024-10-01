import { Component } from '@angular/core';
import { ShareModule } from '../shared/share-module';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { REACTIVE_NODE } from '@angular/core/primitives/signals';
import { htth, ilart, loaivtsd } from '../shared/constants/select.constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  onCurrentPageDataChange($event: any): void {

  }
  constructor(
    private http: HttpClient
  ) { }
  dataDashboard = {
    "estatus1": {
      "count1Sc": 0,
      "countTh": 0,
      "countDth": 0,
      "countLm": 0,
      "countRe": 0
    },
    "estatus2": {
      "count1Sc": 0,
      "countTh": 0,
      "countDth": 0,
      "countLm": 0,
      "countRe": 0
    }
  }
  dataOrderList: any[] = []
  dataIssueList: any[] = []
  dataSelectNhanVien : any = []
  dataSelectHtth = htth;
  dataSelectLvtsd = loaivtsd;
  dataSelectIlart = ilart;

  detailOrder = {
    gsorder: {
      anlhtxt: "",
      anlnr: "",
      arbpl: "",
      auart: "",
      auarttxt: "",
      aufnr: "",
      bbntdate: "",
      bbnttime: "",
      checkstaffql: "",
      checkstaffsd: "",
      checkstaffth: "",
      depid: "",
      depidtxt: "",
      depname: "",
      equnr: "",
      equtxt: "",
      getri: "",
      gewrk: "",
      gewrktxt: "",
      gltri: "",
      gltrp: "",
      gltrs: "",
      gstri: "",
      gstrp: "",
      gstrs: "",
      htth: "",
      htthid: "",
      htxntb: "",
      idat2: "",
      ilart: "",
      iloan: "",
      ingpr: "",
      ingrptxt: "",
      ketqua: "",
      ktext: "",
      loaivtsd: "",
      loaivtsdtxt: "",
      maufnr: "",
      nguoith: "",
      nguoithtxt: "",
      objek: "",
      objnr: "",
      ptsc: "",
      qmnum: "",
      qmtxt: "",
      serge: "",
      statushd: "",
      statussd: "",
      tplnr: "",
      tplnrtxt: "",
      warpl: "",
      warpltxt: "",
      werks: "",
      zuserstatus: "",
      zzsysstatus: "",
    },
    itact: {},
    itcauses: {},
    iteqstatus: {},
    itequi: {},
    ititems: {},
    ittasks: {},
  };
  titleDetail: string = ''

  visibleDetailOrder: boolean = false;

  iwerkString: any = localStorage.getItem('__iwerk');
  iwerk = JSON.parse(this.iwerkString);
  tplnrString: any = localStorage.getItem('__tplnr');
  tplnr = JSON.parse(this.tplnrString);
  plantString: any = localStorage.getItem('__activeIngpr');
  plant = JSON.parse(this.plantString);
  ngOnInit() {
    this.getDataDashboard(this.iwerk, this.tplnr, this.plant)
    this.getDataOrderList();
    //this.getDataIssueList();
  }
  getDataDashboard(iwerk: any, tplnr: any, plants: any) {
    this.http.get(environment.baseApiUrl + `/pm_thongke/${iwerk}/${tplnr}/${plants}`)
      .subscribe({
        next: (response: any) => {
          this.dataDashboard = response
          console.log(response)
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getDataOrderList() {
    var end_date = new Date();
    var start_date = new Date();
    start_date.setDate(end_date.getDate() - 5);
    var query = {
      end_date: end_date.toISOString().slice(0, 10),
      start_date: start_date.toISOString().slice(0, 10),
    }
    this.http.post(environment.baseApiUrl + `/order_list/${this.tplnr}`, query)
      .subscribe({
        next: (response: any) => {
          this.dataOrderList = response.gtorder.item
          console.log(this.dataOrderList)
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getDataIssueList() {
    var end_date = new Date();
    var start_date = new Date();
    start_date.setDate(end_date.getDate() - 5);
    var query = {
      end_date: end_date.toISOString().slice(0, 10),
      start_date: start_date.toISOString().slice(0, 10),
    }
    this.http.post(environment.baseApiUrl + `/issue_list/${this.tplnr}`, query)
      .subscribe({
        next: (response: any) => {
          this.dataOrderList = response
          console.log(this.dataOrderList)
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getDetailOrder(data: any) {
    this.visibleDetailOrder = true
    this.http.get(environment.baseApiUrl + `/order_detail/${data}`)
      .subscribe({
        next: (response: any) => {
          this.detailOrder = response
          this.titleDetail = `THÔNG TIN CHI TIẾT LỆNH SỬA CHỮA (${response.gsorder.aufnr} - ${response.gsorder.ktext})`
          console.log(response)
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
      var __activeRole : any = localStorage.getItem('__activeRole')
      var role = JSON.parse(__activeRole)
      this.http.get(environment.baseApiUrl + `/get_nhanvien/${role}`)
      .subscribe({
        next: (response: any) => {
        this.dataSelectNhanVien = response.gtNv.item;
        this.dataSelectNhanVien.forEach((item: { staffTxt: string; staff: any; }) => {
          item.staffTxt = `${item.staff} - ${item.staffTxt}`
        })
        console.log(this.dataSelectNhanVien)
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })

  }
  closeDetailOrder() {
    this.visibleDetailOrder = false
  }
}
