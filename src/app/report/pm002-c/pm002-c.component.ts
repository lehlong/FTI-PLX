import { Component } from '@angular/core';
import { ShareModule } from '../../shared/share-module';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { ABCIndicator, cautructb, eqtyp, statusHoatDong, statusThietBi } from '../../shared/constants/select.constants';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-pm002-c',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './pm002-c.component.html',
  styleUrl: './pm002-c.component.scss'
})
export class PM002CComponent {
  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Bảng kê lịch sử thay đổi thông tin thiết bị',
        path: 'report/PM002C',
      },
    ])
  }
  __iwerk: any = localStorage.getItem('__iwerk')
  werk = JSON.parse(this.__iwerk)
  __tplnr: any = localStorage.getItem('__tplnr')
  tplnr = JSON.parse(this.__tplnr)
  __activeRole: any = localStorage.getItem('__activeRole')
  role = JSON.parse(this.__activeRole)

  model = {
    werks: this.werk,
    ingpr: '',
    eqtyp: '',
    arbpl: '',
    eqart: '',
    fdate: new Date(),
    tdate: new Date(),
    tplnr: '',
    sfdate: new Date(),
    stdate: new Date(),
    class: '',
    equnr: '',
    cautructb: '',
    abcindicator: '',
    nhanvienth: '',
    phongban: '',
    statusThietBi: '',
    statusHoatDong: ''
  }
  lstSelectIndicator = ABCIndicator
  lstSelectPlantSection = ABCIndicator
  lstSelectFunclocList: any;
  lstSelectWorkCenter: any;
  lstSelectObjectType: any;
  lstSelectPlaner: any;
  lstSelectEqtyp = eqtyp;
  lstSelectCauTrucTb = cautructb;
  lstSelectNhanVien: any;
  lstSelectPhongBan: any;
  lstSelectStatusTb = statusThietBi;
  lstSelectStatusHd = statusHoatDong;
  ngOnInit() {
    this.getFunclocList();
    this.getWorkCenter();
    this.getObjectType();
    this.getPlaner();
    this.getNhanVien();
    this.getPhongBan();
  }

  exportData() {
    this.http.post(environment.baseApiUrl + `/export_report/ZPG_EQUI_CORE/PM002A`, this.model)
      .subscribe({
        next: (response: any) => {
          console.log(response)
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }

  getFunclocList() {
    this.http.get(environment.baseApiUrl + `/funcloc_list/${this.tplnr}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectFunclocList = response.funcloclist.item
          this.lstSelectFunclocList.forEach((item: { descript: string; funcloc: any; }) => {
            item.descript = `${item.funcloc} - ${item.descript}`;
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
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
  getObjectType() {
    this.http.get(environment.baseApiUrl + `/get_object_type`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectObjectType = response.gtT370KT.item
          this.lstSelectObjectType.forEach((item: { eartx: string; eqart: any; }) => {
            item.eartx = `${item.eqart} - ${item.eartx}`;
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getPlaner() {
    this.http.get(environment.baseApiUrl + `/get_planner/${this.werk}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectPlaner = response.gtPlanner.item
          this.lstSelectPlaner.forEach((item: { innam: string; ingrp: any; }) => {
            item.innam = `${item.ingrp} - ${item.innam}`;
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
  getNhanVien() {
    this.http.get(environment.baseApiUrl + `/get_nhanvien/${this.role}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectNhanVien = response.gtNv.item;
          this.lstSelectNhanVien.forEach((item: { staffTxt: string; staff: any; }) => {
            item.staffTxt = `${item.staff} - ${item.staffTxt}`
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }

  getPhongBan() {
    this.http.get(environment.baseApiUrl + `/get_phongban/${this.role}`)
      .subscribe({
        next: (response: any) => {
          this.lstSelectPhongBan = response.gtPb.item;
          this.lstSelectPhongBan.forEach((item: { depidTxt: string; depid: any; }) => {
            item.depidTxt = `${item.depid} - ${item.depidTxt}`
          })
        },
        error: (error) => {
          console.error('Fail load:', error)
        },
      })
  }
}
