import { ShareModule } from './../../shared/share-module/index'
import { Component, OnInit, ViewChild } from '@angular/core'
import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree'
import { OpinionListService } from '../../services/business/opinion-list.service'
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms'
import { GlobalService } from '../../services/global.service'
import { PeriodTimeFilter } from '../../models/master-data/period-time.model'
import { AuditPeriodFilter } from '../../models/master-data/audit-period.model'
import { MgOpinionListService } from '../../services/master-data/mg-opinion-list.service'
import { PeriodTimeService } from '../../services/master-data/period-time.service'
import { AuditPeriodService } from '../../services/master-data/audit-period.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MgOpinionListFilter } from '../../models/master-data/mg-opinion-list.model'
import { OrganizeService } from '../../services/system-manager/organize.service'
import { error } from '@ant-design/icons-angular'
import { NzMessageService } from 'ng-zorro-antd/message'
import { DropdownService } from '../../services/dropdown/dropdown.service'
import { state } from '@angular/animations'
import { ListAuditService } from '../../services/master-data/list-audit.service'

@Component({
  selector: 'app-opinion-list',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './opinion-list.component.html',
  styleUrl: './opinion-list.component.scss',
})
export class OpinionListComponent implements OnInit {
  @ViewChild('treeCom', { static: false }) treeCom!: NzTreeComponent
  mgCode: string = ''
  mgData: any
  auditPeriodfilter = new AuditPeriodFilter()
  periodTimefilter = new PeriodTimeFilter()
  filter = new MgOpinionListFilter()
  timeyear: any[] = []
  auditPeriod: any[] = []
  searchValue = ''
  nodes: any = []
  originalNodes: any[] = []
  opinionUnfinishedNodes: any[] = []
  organizationNames: string[] = []
  organizationNamesString: string = ''
  visible: boolean = false
  edit: boolean = false
  nodeCurrent!: any
  titleParent: string = ''
  loading: boolean = false
  isVisible = false
  orgInOpinion: any // Để lưu dữ liệu từ GetOrgInOpinion
  selectedUnits: any[] = [] // Để lưu các đơn vị đã chọn (isChecked: true)
  tempSelectedUnits: any[] = []
  createSelectedUnits: any[] = []
  treeOrganize: any // Để lưu dữ liệu treeOrganize
  allUnits: any[] = []
  organize: any = []
  accountList: any[] = []
  filteredAccountList: any[] = []
  showPendingOpinionsTree: boolean = false
  pendingOpinionsNodes: any[] = []
  currentTab: string = 'THÔNG TIN'
  timeYear: string = '';
  auditPeriodOpinion: string = '';
  validateForm: FormGroup = this.fb.group({
    code: [''],
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    pId: ['', [Validators.required]],
    children: [null],
    orderNumber: [null],
    mgCode: [''],
    account: ['', [Validators.required]],
  })
  mgOpinionListForm: FormGroup = this.fb.group({
    code: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: [''],
    timeYear: ['', [Validators.required]],
    auditPeriod: ['', [Validators.required]],
    isActive: [true, [Validators.required]],
  })
  opinionForm: FormGroup = this.fb.group({
    timeYear: ['', [Validators.required]],
    auditPeriod: ['', [Validators.required]],
  })
  opinionPendingForm: FormGroup = this.fb.group({
    timeYear: ['', [Validators.required]],
    auditPeriod: ['', [Validators.required]],
  })
  constructor(
    private _service: OpinionListService,
    private fb: NonNullableFormBuilder,
    private globalService: GlobalService,
    private _mgs: MgOpinionListService,
    private _ps: PeriodTimeService,
    private _ap: AuditPeriodService,
    private dropdownService: DropdownService,
    private route: ActivatedRoute,
    private router: Router,
    private _orgs: OrganizeService,
    private message: NzMessageService,
    private auditService: ListAuditService,
  ) {
    this.globalService.setBreadcrumb([
      {
        name: 'Danh mục kiến nghị',
        path: 'business/mg-opinion-list',
      },
    ])
    this.globalService.getLoading().subscribe((value) => {
      this.loading = value
    })
  }
  private populateMgOpinionListForm(data: any) {
    this.mgOpinionListForm.patchValue({
      code: data.code,
      name: data.name,
      description: data.description,
      timeYear: data.timeYear,
      auditPeriod: data.auditPeriod,
      isActive: data.isActive,
    })
    this.opinionForm.patchValue({
      timeYear: data.timeYear,
      auditPeriod: data.auditPeriod,
    })
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.mgCode = params['code']
      const navigation = this.router.getCurrentNavigation()
      if (navigation?.extras.state) {
        const state = navigation.extras.state as { mgOpinionListData: any }
        if (state.mgOpinionListData) {
          this.populateMgOpinionListForm(state.mgOpinionListData)
          this.timeYear = state.mgOpinionListData.timeYear
          this.auditPeriodOpinion = state.mgOpinionListData.auditPeriod
        }
      }
      
      this.getOplWithMgCode()
      this.getAllAuditPeriod()
      this.getMgData()
      this.getAllAccount()
      this.getAllPeriodTime()
      this.getOrgInOpinion()
      this.getOrg()
      this.getOpinionListTreeWithTimeYearAndAuditPeriod(this.timeYear, this.auditPeriodOpinion)
    
    })
  }
  getOrg() {
    this._orgs.getOrg().subscribe((res) => {
      this.organize = res
      console.log(res)
    })
  }
  updateCreateSelectedUnits() {
    this.createSelectedUnits = this.organize.filter(
      (unit: { isChecked: any }) => unit.isChecked,
    )
  }

  getOrgInOpinion() {
    if (this.nodeCurrent && this.nodeCurrent.code) {
      this._service.GetOrgInOpinion(this.nodeCurrent.code).subscribe({
        next: (data) => {
          this.orgInOpinion = data
          if (this.orgInOpinion && this.orgInOpinion.treeOrganize) {
            this.treeOrganize = this.orgInOpinion.treeOrganize
            this.allUnits = this.flattenTree(this.treeOrganize)
            this.updateSelectedUnits()
          } else {
            // Xử lý trường hợp không có dữ liệu treeOrganize
            this.treeOrganize = null
            this.allUnits = []
            this.selectedUnits = []
          }
        },
        error: (error) => console.error(error),
      })
    }
  }
  updateSelectedUnits() {
    this.selectedUnits = this.allUnits.filter((unit) => unit.isChecked)
  }
  flattenTree(node: any): any[] {
    let result = [node]
    if (node.children) {
      node.children.forEach((child: any) => {
        result = result.concat(this.flattenTree(child))
      })
    }
    return result
  }
  getAllAccount() {
    this.dropdownService
      .GetAllAccount({
        IsCustomer: true,
        SortColumn: 'name',
        IsDescending: true,
      })
      .subscribe({
        next: (data) => {
          this.accountList = data
          this.filterAccounts()
        },
        error: (response) => {
          console.log(response)
        },
      })
  }
  filterAccounts() {
    this.filteredAccountList = this.accountList.filter(
      (account) => account.accountType === 'ACT_STC',
    )
  }
  getMgData() {
    if (this.mgOpinionListForm.get('code')?.value) {
      // If the form is already populated, don't fetch data again
      return
    }
    this._mgs.searchMgOpinionList({ KeyWord: this.mgCode }).subscribe({
      next: (data) => {
        if (data.data && data.data.length > 0) {
          this.mgData = data.data[0]
          this.populateMgOpinionListForm(this.mgData)
        }
      },
      error: (error) => console.error(error),
    })
  }

  getOplWithMgCode() {
    this._service.GetOplTreeWithMgCode(this.mgCode).subscribe((res) => {
      this.nodes = [res]
      this.originalNodes = [res]
    })
  }
  // Viết lại hàm này lọc năm lọc đợt
  viewPendingOpinions() {
    const timeYear = this.opinionPendingForm.get('timeYear')?.value
    const auditPeriod = this.opinionPendingForm.get('auditPeriod')?.value

    if (timeYear && auditPeriod) {
      console.log('hh')
      this.getOpinionUnfinished(timeYear, auditPeriod)
    } else {
      console.log('Nhập cả 2 timeYear và auditPeriod')
    }
  }
  getOpinionUnfinished(timeYear: string, auditPeriod: string){
    console.log('heheh')
    this.auditService.getListOpinionUnfinished(timeYear, auditPeriod).subscribe({
      next: (data) => {
       //this.getOrganizeIds(data);
        this.opinionUnfinishedNodes = [data];     
      },
      error: (error) => {
        console.error('Lỗi :', error)
        this.showPendingOpinionsTree = false
      },
    })
  }
  getOrganizeIds(node: any): string[] {
    const organizeIds: string[] = [];
  
    if (node.organizeReferences && node.organizeReferences.length > 0) {
      node.organizeReferences.forEach((ref: any) => {
        organizeIds.push(ref.organizeId);
      });
    }
    this.getOrganizationNames(organizeIds, this.organize)
    return organizeIds;
  }
    
  onNodeClick(event: any): void{
    const clickedNode = event.node.origin;
    const organizeIds = this.getOrganizeIds(clickedNode);
    
    this.showPendingOpinionsTree = true
  }
  getOrganizationNames(organizedIds: string[], organizations: any[]): string[] {
    const organizationNames: string[] = [];
  
    organizedIds.forEach((id) => {
      const org = organizations.find((organization) => organization.id === id);
      if (org) {
        organizationNames.push(org.name);
      }
    });
    this.organizationNames = organizationNames;
    this.organizationNamesString = this.organizationNames.join(', ');
    return organizationNames;
  }
  
  getOpinionListTreeWithTimeYearAndAuditPeriod(
    timeYear: string,
    auditPeriod: string,
  ) {
    this._service
      .GetOpinionListTreeWithTimeYearAndAuditPeriod(timeYear, auditPeriod)
      .subscribe({
        next: (data) => {
          this.pendingOpinionsNodes = [data]
         
        },
        error: (error) => {
          console.error('Lỗi :', error)
          this.showPendingOpinionsTree = false
        },
      })
  }
  nzEvent(event: NzFormatEmitEvent): void {
    // console.log(event);
  }

  onDrop(event: any) {}

  onDragStart(event: any) {}

  showModal(): void {
    this.isVisible = true
  }

  handleOk(): void {
    this.createSelectedUnits.push(...this.tempSelectedUnits)
    this.tempSelectedUnits = []
    this.updateCreateSelectedUnits()
    this.updateSelectedUnits()
    this.isVisible = false
  }

  handleCancel(): void {
    this.tempSelectedUnits.forEach((unit) => {
      if (unit.isChecked) {
        unit.isChecked = false
      }
    })
    this.isVisible = false
  }
  onClick(node: any) {
    this.edit = true
    this.visible = true
    this.nodeCurrent = node?.origin
    this.titleParent = node.parentNode?.origin?.title || ''
    this.validateForm.setValue({
      code: this.nodeCurrent?.code,
      id: this.nodeCurrent?.id,
      name: this.nodeCurrent?.name,
      pId: this.nodeCurrent?.pId,
      children: [],
      orderNumber: this.nodeCurrent?.orderNumber,
      mgCode: this.nodeCurrent?.mgCode || this.mgCode,
      account: this.nodeCurrent?.account,
    })
    this.getOrgInOpinion()
    if (this.currentTab === 'KIẾN NGHỊ CÒN TỒN ĐỌNG') {
      this.selectedUnits = this.selectedUnits.filter((unit) => unit.isPending)
    }
  }

  close() {
    this.createSelectedUnits = []
    this.tempSelectedUnits = []
    this.visible = false
    this.resetForm()
  }

  reset() {
    this.searchValue = ''
    this.getOplWithMgCode()
    this.nodes = [...this.originalNodes]
  }

  resetForm() {
    this.validateForm.reset()
  }

  openCreateChild(node: any) {
    this.close()
    this.edit = false
    this.visible = true
    this.validateForm.get('pId')?.setValue(node?.origin.id)
    this.validateForm.get('orderNumber')?.setValue(null)
    this.validateForm.get('children')?.setValue([])
    this.validateForm.get('mgCode')?.setValue(this.mgCode)
    this.validateForm.get('account')?.setValue(null)
  }

  openCreate() {
    this.close()
    this.edit = false
    this.visible = true
    this.validateForm.get('pId')?.setValue(this.nodeCurrent?.id || 'R')
    this.validateForm.get('children')?.setValue([])
    this.validateForm.get('orderNumber')?.setValue(null)
    this.validateForm.get('mgCode')?.setValue(this.mgCode)
    this.validateForm.get('account')?.setValue(null)
  }

  isIdExist(id: string, node: any): boolean {
    if (node.id === id) {
      return true
    }
    if (node.children) {
      for (const child of node.children) {
        if (this.isIdExist(id, child)) {
          return true
        }
      }
    }
    return false
  }
  submitForm() {
    if (!this.validateForm.valid) {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty()
          control.updateValueAndValidity({ onlySelf: true })
        }
      })
      return
    }
    const formData = this.validateForm.getRawValue()

    // Thêm organizeReferences vào formData

    if (this.edit) {
      formData.organizeReferences = this.selectedUnits.map((unit) => ({
        organizeId: unit.id,
        isPending: unit.isPending || false, // Giả sử mỗi unit có thuộc tính isPending, nếu không có thì mặc định là false
      }))
      this._service.Update(formData).subscribe({
        next: (data) => {
          this.getOplWithMgCode()
          this.visible = false
        },
        error: (response) => {
          console.log(response)
        },
      })
    } else {
      const newId = formData.id
      const idExists = this.nodes.some((node: any) =>
        this.isIdExist(newId, node),
      )
      if (idExists) {
        this.message.error(
          `Mã chỉ tiêu ${newId} đã được sử dụng, vui lòng nhập lại`,
        )
        return
      }
      formData.code = this.generateUUID()
      formData.organizeReferences = this.createSelectedUnits.map((unit) => ({
        opinionListCode: formData.code,
        organizeId: unit.id,
        isPending: unit.isPending || false, // Giả sử mỗi unit có thuộc tính isPending, nếu không có thì mặc định là false
      }))
      this._service.Insert(formData).subscribe({
        next: (data) => {
          this.getOplWithMgCode()
        },

        error: (response) => {
          console.log(response)
        },
      })
    }
  }

  updateOrderTree() {
    const treeData = this.treeCom
      .getTreeNodes()
      .map((node) => this.mapNode(node))
    const updatedTreeData = {
      ...treeData[0],
      mgCode: this.mgCode,
    }
    this._service.UpdateOrderTree(updatedTreeData).subscribe({
      next: (data) => {
        this.getOplWithMgCode()
      },
      error: (response) => {
        console.log(response)
      },
    })
  }

  private mapNode(node: any): any {
    const children = node.children
      ? node.children.map((child: any) => this.mapNode(child))
      : []
    return {
      code: node.origin.code,
      id: node.origin.id,
      pId: node.parentNode?.key || '-',
      name: node.origin.name,
      children: children,
      mgCode: this.mgCode,
      account: node.origin.account,
    }
  }
  submitFormUpdate() {
    if (this.mgOpinionListForm.valid) {
      const formData = this.mgOpinionListForm.value
      this._mgs.updateMgOpinionList(formData).subscribe({
        next: (data) => {
          this.getMgData()
        },
        error: (response) => {
          console.log(response)
        },
      })
    }
  }

  deleteItem(node: any) {
    if (node.children && node.children.length > 0) {
      // Thông báo rằng không thể xóa vì node có children
      this.message.error(
        'Không được phép xóa Cấu trúc tổ chức Cha khi còn các thành phần con',
      )
      return // Dừng quá trình xóa
    }
    this._service.Delete(node.origin.code).subscribe({
      next: (data) => {
        this.getOplWithMgCode()
      },
      error: (response) => {
        console.log(response)
      },
    })
  }
  removeUnit(unit: any) {
    const index = this.allUnits.findIndex((u) => u.id === unit.id)

    if (index !== -1) {
      this.allUnits[index].isChecked = false
      this.updateSelectedUnits()
    }
  }
  removeCreateUnit(unit: any) {
    this.createSelectedUnits = this.createSelectedUnits.filter(
      (u) => u !== unit,
    )
    this.tempSelectedUnits = this.tempSelectedUnits.filter((u) => u !== unit)
    unit.isChecked = false
  }

  onUnitCheck(unit: any) {
    // Cập nhật trạng thái isChecked của đơn vị
    const index = this.allUnits.findIndex((u) => u.id === unit.id)
    if (index !== -1) {
      this.allUnits[index].isChecked = unit.isChecked
    }
  }
  onCreateUnitCheck(unit: any) {
    const tempIndex = this.tempSelectedUnits.findIndex((u) => u.id === unit.id)
    if (tempIndex === -1) {
      this.tempSelectedUnits.push(unit)
    } else {
      this.tempSelectedUnits.splice(tempIndex, 1)
    }
  }

  updateTreeCheckedStatus(node: any, id: string, isChecked: boolean) {
    if (node.id === id) {
      node.isChecked = isChecked
    }
    if (node.children) {
      node.children.forEach((child: any) =>
        this.updateTreeCheckedStatus(child, id, isChecked),
      )
    }
  }

  generateUUID(): string {
    let d = new Date().getTime()
    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now() // Thêm độ chính xác của thời gian
    }
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      (c) => {
        const r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      },
    )
    return uuid
  }
  searchTables(searchValue: string) {
    const filterNode = (node: NzTreeNodeOptions): boolean => {
      if (node.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true
      } else if (node.children) {
        node.children = node.children.filter((child) => filterNode(child))
        return node.children.length > 0
      }
      return false
    }

    if (!searchValue) {
      this.nodes = [...this.originalNodes]
    } else {
      this.nodes = this.originalNodes
        .map((node) => ({ ...node }))
        .filter((node) => filterNode(node))
    }
  }
  getAllAuditPeriod() {
    this._ap.searchAuditPeriod(this.auditPeriodfilter).subscribe({
      next: ({ data }) => {
        this.auditPeriod = data
      },
      error: (response) => {
        console.log(response)
      },
    })
  }
  getAllPeriodTime() {
    this._ps.searchPeriodTime(this.periodTimefilter).subscribe({
      next: ({ data }) => {
        this.timeyear = data
      },
      error: (response) => {
        console.log(response)
      },
    })
  }
  getNameAuditPeriod(auditPeriod: string) {
    if (!this.auditPeriod) {
      return null
    }
    return this.auditPeriod.find((x: { code: string }) => x.code == auditPeriod)
      ?.auditPeriod
  }
  onTabChange(tabIndex: number) {
    const tabTitles = [
      'THÔNG TIN',
      'CÂY KIẾN NGHỊ KIỂM TOÁN',
      'KIẾN NGHỊ CÒN TỒN ĐỌNG',
    ]
    this.currentTab = tabTitles[tabIndex]
  }
  getTableData(): any[] {
    if (this.edit) {
      if (this.currentTab === 'KIẾN NGHỊ CÒN TỒN ĐỌNG') {
        return this.selectedUnits.filter((unit) => unit.isPending)
      } else {
        return this.selectedUnits
      }
    } else {
      return this.createSelectedUnits
    }
  }
}
