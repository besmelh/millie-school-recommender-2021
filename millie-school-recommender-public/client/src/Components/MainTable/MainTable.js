import React from 'react';
import { DataGrid, GridToolbar, getGridNumericColumnOperators } from '@material-ui/data-grid';
import './MainTable.css';
import '../MillieSearchBar/MillieSearchBar.css';
import { useHistory } from 'react-router-dom';

function MainTable(props){
  let history = useHistory();

  return (
    <div>
      <div className={`${MainTable} `} style={{ height: 800, width: '100%'}}>

        <DataGrid 
          rows={props.rows}
          columns={props.columns}
          checkboxSelection
          disableSelectionOnClick
          className={'DataGrid'}
          components={{
            Toolbar: GridToolbar,
          }}
          pagination
          filterModel={props.filterModel}
          onRowClick={(param) => 
            history.push(`/school-details/${param.row['millie_code']}`)
          }
        />
      </div>
    </div>
    );
  }
    
export default MainTable;