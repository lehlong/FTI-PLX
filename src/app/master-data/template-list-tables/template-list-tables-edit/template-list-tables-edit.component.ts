import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { ShareModule } from '../../../shared/share-module'
import {
  NzFormatEmitEvent,
  NzTreeComponent,
  NzTreeNode,
  NzTreeNodeOptions,
} from 'ng-zorro-antd/tree'
import { TEMPLATE_LIST_TABLES_RIGHTS } from '../../../shared/constants'
import { TemplateListTablesDataService } from '../../../services/master-data/template-list-tables-data.service'
import { NzMessageService } from 'ng-zorro-antd/message'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-template-list-tables-edit',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './template-list-tables-edit.component.html',
  styleUrl: './template-list-tables-edit.component.scss',
})
export class TemplateListTablesEditComponent {
  @Input() temDetail!: any
  @Output() childEvent = new EventEmitter<any>()
  @ViewChild('treeOrganize') treeOrganize!: NzTreeComponent
  @ViewChild('treeListTables') treeListTables!: NzTreeComponent
  organizeNodes: any[] = []
  listTablesNodes: any[] = []
  loading: boolean = false
  searchValue: string = ''
  searchValueListTables: string = ''
  previouslyCheckedOrgs: string[] = []
  newlyCheckedOrg: string | null = null
  TEMPLATE_LIST_TABLES_RIGHTS = TEMPLATE_LIST_TABLES_RIGHTS
  selectedOrgCode: string | null = null
  currentSelectedOrgCode: string | null = null
  originalListTablesNodes: any[] = []
  originalOrganizeNodes: any[] = []
  recentlyUncheckedListTables: Set<string> = new Set()
  recentlyDeletedNode: any = null
  constructor(
    private templateListTablesDataService: TemplateListTablesDataService,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
  ) {}
  ngOnInit() {
    // Khởi tạo các organize đã được chọn trước đó
    this.previouslyCheckedOrgs = this.temDetail.treeOrganize.children
      .filter((org: any) => org.isChecked)
      .map((org: any) => org.id)
    this.originalListTablesNodes = [...this.listTablesNodes]
    this.originalOrganizeNodes = [...this.organizeNodes]
  }
  nzEvent(event: NzFormatEmitEvent): void {}

  getCheckedNodes(nodes: any[]): any[] {
    //lấy danh sách các node đã được chọn
    let checkedNodes: any[] = []
    for (let node of nodes) {
      if (node.checked) {
        checkedNodes.push(node)
        if (node.children) {
          checkedNodes = checkedNodes.concat(
            this.getCheckedNodes(node.children),
          )
        }
      }
    }
    return checkedNodes
  }
  onListTablesCheckChange(event: NzFormatEmitEvent): void {
    const listTablesNode = event.node!
    if (!listTablesNode.isChecked) {
      this.recentlyDeletedNode = listTablesNode
    } else {
      this.recentlyDeletedNode = null
    }
  }
  deleteUncheckedListTables(): void {
    if (!this.recentlyDeletedNode) {
      this.message.info('Vui lòng bỏ chọn một chỉ tiêu để xóa')
      return
    }

    const orgCode = this.selectedOrgCode ?? ''
    const templateCode = this.temDetail.code
    const listTablesCode = this.recentlyDeletedNode.origin?.['code']

    this.loading = true

    this.templateListTablesDataService
      .deleteTemplateListTablesData({
        orgCode: orgCode,
        listTablesCode: listTablesCode,
        templateCode: templateCode,
      })
      .subscribe({
        next: (response) => {
          if (response && response.data) {
            this.updateUIAfterDelete(this.recentlyDeletedNode)
            this.updateLocalData(response.data)
            this.sendDataToParent()
          } else {
            this.message.error('Xóa thất bại: Dữ liệu phản hồi không hợp lệ')
          }
          this.loading = false
          this.recentlyDeletedNode = null
        },
        error: (error) => {
          this.message.error(
            'Xóa thất bại: ' + (error.message || 'Đã xảy ra lỗi'),
          )
          console.log(error)
          this.loading = false
        },
      })
  }

  updateUIAfterDelete(deletedNode: any): void {
    // Cập nhật trạng thái checked của node trong cây
    this.updateNodeCheckedStatus(this.listTablesNodes, deletedNode.key, false)

    // Cập nhật dữ liệu trong temDetail
    if (this.selectedOrgCode) {
      const org = this.temDetail.treeOrganize.children.find(
        (org: any) => org.id === this.selectedOrgCode,
      )
      if (org && org.treeListTables) {
        this.updateNodeCheckedStatus(org.treeListTables, deletedNode.key, false)
      }
    }

    // Cập nhật lại cây
    if (this.treeListTables) {
      this.treeListTables.nzTreeService.initTree(this.listTablesNodes)
    }

    // Cập nhật dữ liệu gốc
    this.updateOriginalData(deletedNode.key)
  }

  updateNodeCheckedStatus(nodes: any[], key: string, checked: boolean): void {
    for (let node of nodes) {
      if (node.id === key || node.key === key) {
        node.isChecked = checked
        node.checked = checked
        return
      }
      if (node.children) {
        this.updateNodeCheckedStatus(node.children, key, checked)
      }
    }
  }

  updateOriginalData(key: string): void {
    // Cập nhật dữ liệu gốc trong temDetail
    const updateOriginalNode = (nodes: any[]) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === key) {
          nodes[i].isChecked = false
          return true
        }
        if (nodes[i].children && updateOriginalNode(nodes[i].children)) {
          return true
        }
      }
      return false
    }

    if (this.selectedOrgCode) {
      const org = this.temDetail.treeOrganize.children.find(
        (org: any) => org.id === this.selectedOrgCode,
      )
      if (org && org.treeListTables) {
        updateOriginalNode(org.treeListTables)
      }
    }
  }

  onOrganizeNodeClick(event: NzFormatEmitEvent): void {
    //Khi click vào một organize, cập nhật danh sách (opinionNodes) tương ứng.
    if (event && event.node) {
      this.selectedOrgCode = event.node?.key ?? null
      this.currentSelectedOrgCode = event.node.key
      this.updateListTablesList(event.node)
    } else {
      if (event.node) {
        this.selectedOrgCode = event.node.key
        this.updateListTablesList(event.node)
      }
    }
  }
  sendDataToParent() {
    const organizeChecked = this.getCheckedNodes(this.organizeNodes)
    const listTablesChecked = this.getCheckedNodes(this.listTablesNodes)
    this.childEvent.emit({
      organizeChecked,
      listTablesChecked,
    })
  }

  onCheckChange() {
    //Khi checked của organize thay đổi, ktra xem có chọn 1 organize hay ko.
    const selectedOrganize = this.treeOrganize.getCheckedNodeList()
    if (selectedOrganize.length > 1) {
      this.message.error('Vui lòng chỉ chọn một đơn vị')
      // Reset check state
      this.treeOrganize.nzCheckedKeys = [selectedOrganize[0].key]
    }
    this.sendDataToParent()
  }
  updateListTablesList(orgNode: NzTreeNode): void {
    //Cập nhật orgNode dựa trên organize được chọn.
    // Nếu organize có giá trị opinion trên (treeListTables), nó sẽ sử dụng dữ liệu này,
    // nếu không, nó sẽ sử dụng dữ liệu mặc định từ temDetail.
    if (!orgNode) return

    // Tìm dữ liệu của organize node từ dữ liệu gốc
    const orgData = this.temDetail.treeOrganize.children.find(
      (org: any) => org.id === orgNode.key,
    )

    if (orgData && orgData.treeListTables) {
      this.listTablesNodes = this.mapTreeNodes({
        children: orgData.treeListTables,
      })
    } else {
      this.listTablesNodes = this.mapTreeNodes(this.temDetail.treeListTables)
    }
    console.log(this.listTablesNodes)

    this.updateListTablesCheckedStatus(
      this.listTablesNodes,
      orgData ? orgData.treeListTables : [],
    )

    if (this.treeListTables) {
      this.treeListTables.nzTreeService.initTree(this.listTablesNodes)
      this.expandAllNodes(this.listTablesNodes)
    }
  }
  expandAllNodes(nodes: any[]): void {
    //Mở rộng tất cả các node trong cây để chúng hiển thị hết.
    nodes.forEach((node) => {
      node.expanded = true
      if (node.children && node.children.length > 0) {
        this.expandAllNodes(node.children)
      }
    })
  }
  updateListTablesCheckedStatus(nodes: any[], dbOpinions: any[]): void {
    nodes.forEach((node) => {
      const dbOpinion = dbOpinions.find((op: any) => op.id === node.key)
      if (dbOpinion) {
        node.checked = dbOpinion ? dbOpinion.isChecked : false
      }
      if (node.children) {
        this.updateListTablesCheckedStatus(node.children, dbOpinions)
      }
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['temDetail'] && changes['temDetail'].currentValue) {
      const temDetail = changes['temDetail'].currentValue
      if (temDetail.treeOrganize) {
        this.organizeNodes = this.mapTreeNodes(temDetail.treeOrganize)
      }
      if (temDetail.treeListTables) {
        this.listTablesNodes = this.mapTreeNodes(temDetail.treeListTables)
      }

      this.sendDataToParent()
    }
  }

  mapTreeNodes(data: any): any[] {
    if (!data || !data.children) return []

    return data.children.map((node: any) => {
      const mappedNode = {
        code: node.code,
        id: node.id,
        name: node.name,
        pId: node.pId,
        title: node.title,
        key: node.id,
        checked: node.isChecked,
        isLeaf: !node.children || node.children.length === 0,
        mgCode: node.mgCode,
        children: [],
      }

      if (node.children && node.children.length > 0) {
        ;(mappedNode as any).children = this.mapTreeNodes(node)
        // Truyền trạng thái checked xuống các node con
        if (mappedNode.checked) {
          this.setAllChildrenChecked(mappedNode.children)
        }
      }

      return mappedNode
    })
  }
  setAllChildrenChecked(nodes: any[]): void {
    //Set checked cho tất cả các node con khi node cha được chọn
    nodes.forEach((node) => {
      node.checked = true
      if (node.children) {
        this.setAllChildrenChecked(node.children)
      }
    })
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
  submitFormData() {
    const selectedOrganize = this.treeOrganize.getCheckedNodeList()
    const selectedListTables = this.getAllCheckedNodes(
      this.treeListTables.getTreeNodes(),
    )

    const leafOpinions = selectedListTables.filter(
      (node) => !node.children || node.children.length === 0,
    )
    if (selectedOrganize.length === 0 && leafOpinions.length === 0) {
      this.message.error('Vui lòng chọn ít nhất một đơn vị')
      return
    }

    if (leafOpinions.length === 0) {
      this.message.error('Vui lòng chọn ít nhất một chỉ tiêu')
      return
    }

    const templateCode = this.temDetail.code
    let dataToSave: any[] = []
    console.log(selectedListTables)

    if (this.newlyCheckedOrg) {
      // Chỉ lưu dữ liệu cho organize mới được chọn
      const newOrg = selectedOrganize.find(
        (org) => org.key === this.newlyCheckedOrg,
      )

      if (newOrg) {
        dataToSave = selectedListTables.map((listTables) => ({
          code: this.generateUUID(),
          orgCode: newOrg.key,
          listTablesCode: (listTables.origin as any)['code'],
          templateCode: templateCode,
          isActive: true,
        }))
      }
    } else {
      // Trường hợp thêm mới opinion cho organize đã tồn tại
      const existingOrg = selectedOrganize.find((org) =>
        this.previouslyCheckedOrgs.includes(org.key),
      )
      console.log('exiting', existingOrg)

      if (existingOrg) {
        const existingOpinions = this.getExistingOpinions(existingOrg.key)
        const newOpinions = selectedListTables.filter(
          (listTables) =>
            !existingOpinions.some((eo) => eo.id === listTables.key),
        )
        console.log('old', existingOpinions)

        console.log('new', newOpinions)

        dataToSave = newOpinions.map((listTables) => ({
          code: this.generateUUID(),
          orgCode: existingOrg.key,
          listTablesCode: (listTables.origin as any)['code'],
          templateCode: templateCode,
          isActive: true,
        }))
      }
    }
    console.log('newcheck', this.newlyCheckedOrg)
    if (dataToSave.length === 0) {
      this.message.info('Không có dữ liệu mới để lưu')
      return
    }

    this.templateListTablesDataService
      .createTemplateListTablesData(dataToSave)
      .subscribe({
        next: (response) => {
          // Cập nhật danh sách các organize đã được chọn
          if (this.newlyCheckedOrg) {
            this.previouslyCheckedOrgs.push(this.newlyCheckedOrg)
            this.newlyCheckedOrg = null
          }
          this.sendDataToParent()
          // Cập nhật lại dữ liệu local sau khi lưu thành công
          this.updateLocalData(dataToSave)
        },
        error: (error) => {
          this.message.error('Lưu thất bại: ' + error.message)
          console.log(error)
        },
      })
  }

  getExistingOpinions(orgCode: string): any[] {
    const org = this.temDetail.treeOrganize.children.find(
      (org: any) => org.id === orgCode,
    )

    const getCheckedListTables = (listTables: any[]): any[] => {
      let result: any[] = []
      listTables.forEach((op) => {
        if (op.isChecked) {
          result.push({
            code: op.code,
            id: op.id,
            title: op.title,
            isChecked: op.isChecked,
          })
        }
        if (op.children && op.children.length > 0) {
          result = result.concat(getCheckedListTables(op.children))
        }
      })
      return result
    }

    if (org && org.treeListTables) {
      return getCheckedListTables(org.treeListTables)
    }
    return []
  }

  resetAfterSave(): void {
    this.newlyCheckedOrg = null
    this.previouslyCheckedOrgs = this.treeOrganize
      .getCheckedNodeList()
      .map((node) => node.key)
  }

  updateLocalData(newData: any[]): void {
    // Tạo một Set chứa tất cả các listTablesCode còn lại sau khi xóa
    const remainingListTablesCodes = new Set(
      newData.map((item) => item.listTablesCode),
    )

    // Hàm đệ quy để cập nhật trạng thái checked của các node
    const updateNodeStatus = (nodes: any[]) => {
      nodes.forEach((node) => {
        if (node.code) {
          // Nếu node có trong remainingListTablesCodes, đánh dấu là checked
          // Ngược lại, đánh dấu là unchecked
          node.isChecked = remainingListTablesCodes.has(node.code)
        }
        if (node.children && node.children.length > 0) {
          updateNodeStatus(node.children)
        }
      })
    }

    // Cập nhật trạng thái trong temDetail.treeOrganize
    this.temDetail.treeOrganize.children.forEach((org: any) => {
      if (org.id === this.selectedOrgCode && org.treeListTables) {
        updateNodeStatus(org.treeListTables)
      }
    })

    // Cập nhật trạng thái trong listTablesNodes
    updateNodeStatus(this.listTablesNodes)

    // Cập nhật lại cây trên UI
    if (this.treeListTables) {
      this.treeListTables.nzTreeService.initTree(this.listTablesNodes)
    }

    // Cập nhật lại selectedOrgCode nếu cần
    if (this.selectedOrgCode) {
      const node = this.treeOrganize.getTreeNodeByKey(this.selectedOrgCode)
      if (node) {
        this.updateListTablesList(node)
      }
    }
  }
  onOrganizeCheckChange(event: NzFormatEmitEvent): void {
    const checkedNode = event.node!
    if (this.previouslyCheckedOrgs.includes(checkedNode.key)) {
      if (!checkedNode.isChecked) {
        checkedNode.isChecked = true
        this.treeOrganize.nzTreeService.setCheckedNodeList(checkedNode)
        return
      }
    }
    if (checkedNode.isChecked) {
      if (!this.previouslyCheckedOrgs.includes(checkedNode.key)) {
        if (this.newlyCheckedOrg) {
          const previousNewNode = this.treeOrganize.getTreeNodeByKey(
            this.newlyCheckedOrg,
          )
          if (previousNewNode) {
            previousNewNode.isChecked = false
            this.treeOrganize.nzTreeService.setCheckedNodeList(previousNewNode)
          }
        }
        this.newlyCheckedOrg = checkedNode.key
      }
    } else {
      if (checkedNode.key === this.newlyCheckedOrg) {
        this.newlyCheckedOrg = null
      }
    }

    this.treeOrganize.nzTreeService.setCheckedNodeList(checkedNode)
  }

  getAllCheckedNodes(nodes: NzTreeNode[]): NzTreeNode[] {
    let checkedNodes: NzTreeNode[] = []
    for (let node of nodes) {
      if (node.isChecked || node.isHalfChecked) {
        checkedNodes.push(node)
      }
      if (node.children) {
        checkedNodes = checkedNodes.concat(
          this.getAllCheckedNodes(node.children),
        )
      }
    }
    return checkedNodes
  }

  searchListTables(searchValueListTables: string) {
    const filterNode = (node: NzTreeNodeOptions): boolean => {
      if (
        node.title.toLowerCase().includes(searchValueListTables.toLowerCase())
      ) {
        return true
      } else if (node.children) {
        node.children = node.children.filter((child) => filterNode(child))
        return node.children.length > 0
      }
      return false
    }

    if (!searchValueListTables) {
      this.listTablesNodes = [...this.originalListTablesNodes]
    } else {
      this.listTablesNodes = this.originalListTablesNodes
        .map((node) => ({ ...node }))
        .filter((node) => filterNode(node))
    }
  }

  searchOrganize(searchValue: string) {
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
      this.organizeNodes = [...this.originalOrganizeNodes]
    } else {
      this.organizeNodes = this.originalOrganizeNodes
        .map((node) => ({ ...node }))
        .filter((node) => filterNode(node))
    }
  }
  preview() {
    const templateCode = this.temDetail.code
    this.templateListTablesDataService
      .searchTemplateListTablesData({ KeyWord: templateCode })
      .subscribe({
        next: (result) => {
          if (result.data && result.data.length > 0) {
            this.router.navigate(
              [
                '/master-data/template-list-tables-preview',
                this.temDetail.code,
              ],
              { state: { templateListData: result.data } },
            )
          }
        },
        error: (error) => console.error(error),
      })
  }
  exportExcel() {
    this.loading = true
    const templateCode = this.temDetail.code
    return this.templateListTablesDataService
      .exportExcelDataTemplateListTablesData(templateCode)
      .subscribe((result: Blob) => {
        const blob = new Blob([result], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        })
        const url = window.URL.createObjectURL(blob)
        var anchor = document.createElement('a')
        anchor.download = this.temDetail.name + '.xlsx'
        anchor.href = url
        this.loading = false
        anchor.click()
      })
  }
}
