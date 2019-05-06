import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-eis-grid',
  templateUrl: './eis-grid.component.html',
  styleUrls: ['./eis-grid.component.css']
})
export class EisGridComponent implements OnInit {
  @Input() treeViewMode = false;
  @Input() columnDefs = [];
  @Input() rowData = [];
  @Output() rowSelectEvent = new EventEmitter();
  gridOptions: GridOptions;
  currentRow = {};
  suppressSelectionChanged = false;
  public defaultColDef;
  public getRowNodeId;
  
  /* The following fields getDataPath and autoGroupColumnDef
     are functions that should be set by host component in the OnInit method.
     for example:
        this.eisGrid.getDataPath = function(data) {
          return data.incidentName;
        };
        this.autoGroupColumnDef = {
          headerName: 'Incident Name', <--- or Request Number ?
          filter: 'agTextColumnFilter',
          cellRendererParams: { suppressCount: true }
        };
  */
  public getDataPath;
  public autoGroupColumnDef;
  public groupDefaultExpanded;

  constructor() {
    this.defaultColDef = {
      resizable: true,
      sortable: true,
      suppressMenu: true,
      // default column filter, if other than text type change in host column def
      filter: 'agTextColumnFilter'
    };
    this.getRowNodeId = function( row ) {
      return row.id;
    };
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableSorting = true;
    /*
    this.gridOptions.getRowClass = function(params) {
      console.log(params);
      if (params.node.selected === false && params.node.rowIndex % 2 === 0) {
          return 'ag-alt-row-color';
      }
    };
    */
  }

  onSelectionChanged() {
    if ( this.suppressSelectionChanged === false ) {
       const row = this.gridOptions.api.getSelectedRows()[0];
       this.rowSelectEvent.emit(row);
     }
     this.suppressSelectionChanged = false;
   }

   clearSelected() {
     this.suppressSelectionChanged = true;
     this.gridOptions.api.deselectAll();
   }

   clearFilters() {
    this.gridOptions.api.setFilterModel(null);
    this.gridOptions.api.onFilterChanged();
   }

   removeSelectedRows() {
    const selectedData = this.gridOptions.api.getSelectedRows();
    this.gridOptions.api.updateRowData({ remove: selectedData });
   }

   updateRowById( newRow ) {
    const itemsToUpdate = [];
    this.gridOptions.api.forEachNodeAfterFilterAndSort(function(rowNode, index) {
      const rowdata = rowNode.data;
      if ( rowdata.id === newRow.id ) {
        itemsToUpdate.push(newRow);
      } else {
        // itemsToUpdate.push(rowdata);
      }
    });

    if ( itemsToUpdate.length === 0 && newRow.id > 0 ) {
      const itemsToAdd = [];
      itemsToAdd.push(newRow);
      this.gridOptions.api.updateRowData({ add: itemsToAdd });
    } else if (itemsToUpdate.length > 0 ) {
      this.gridOptions.api.updateRowData({ update: itemsToUpdate });
    }

   }

   sortGrid(sort) {
    this.gridOptions.api.setSortModel(sort);
   }

   checkboxRenderer(params) {
    if (params.value === true) {
      var imgEle = document.createElement('img');
      imgEle.src = 'assets/images/checkbox-smallest.png';
      imgEle.style.display = 'block';
      imgEle.style.width = '16px';
      imgEle.style.paddingTop = '3px';
      params.eGridCell.textAlign = 'center';
      params.eGridCell.appendChild(imgEle);
    }
  }

}
