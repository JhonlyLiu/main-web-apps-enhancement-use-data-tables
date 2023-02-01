import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  cells: {
    style: {
      display: 'flex',
      justifyContent: 'center',
    }
  }
}
/**
 * DisplayDataTable
 * component to display DataTable component
 * @param columns 
 * @param data 
 * @param loading 
 * @param totalRows 
 * @param currentPage 
 * @param handlePageChange 
 * @returns 
 */
export default function DisplayDataTable (
  columns: any[],
  data: any[],
  loading: boolean,
  totalRows: number,
  currentPage: number,
  handlePageChange: any
){
  let startRange = ((currentPage-1)*10)+1
  let indexNumbering = []
  
  for (let i = 0; i < data.length; i++){
    indexNumbering.push(startRange)
    startRange++
  }

  for (let i = 0; i < data.length; i++){
    data[i].indexNumbering = indexNumbering[i]
  }
  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={handlePageChange}
      fixedHeader={true}
      fixedHeaderScrollHeight={"300px"}
      paginationComponentOptions={{
        'rangeSeparatorText': "of",
        'noRowsPerPage': true
      }}
      customStyles={customStyles}
    />
  )
}