// ** React Imports
import { useCallback, useEffect, useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/main/@core/context/settingsContext'

// ** Other Import
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { deleteDepartment, listDepartmentPagination } from 'src/main/services/DepartmentManagement'
import DisplayDataTable from 'src/components/global/DataTables'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const Departmentlist = (props: Props) => {
  // ** Props
  const { hidden, toggleNavVisibility } = props

  // ** States
  const [allDepartment, setAllDepartment] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalRow, setTotalRow] = useState(0)
  const [departmentName, setDepartmentName] = useState('')

  /**
   * handlePageChange
   * @param page 
   */
  const handlePageChange = (page: any) => {
    fetchAllDepartment(page)
  }

  /**
   * confirmDelete
   * handle give alert when department want to be deleted and hit API to delete department
   * @param row 
   */
  const confirmDelete = (row:any) => {
    Swal.fire({
      title: 'Are you sure want to delete this user?',
      text: 'This will remove user and all data associated with it',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      icon: 'warning'
    }).then((result) => {
      if(result.isConfirmed){
        const departmentDel = async () => {
          await deleteDepartment(row.id)
          window.location.reload()
        }
        departmentDel()
      }
    })
  }

   /**
   * fetch All department
   * 
   * This function is used to fetch all members data
   * 
   * @param page 
   */
  const fetchAllDepartment = useCallback(async (page: any): Promise<void> => {
    setLoading(true)
    if(Cookies.get('token')){
      const response = await listDepartmentPagination(page, departmentName ?? '')
      if(response){
        setAllDepartment(response.data.data)
        setCurrentPage(response.data.currentPage)
        setTotalRow(response.data.total)
        setLoading(false)
      }
    }
  },[])

   /**
     * fetch All department
     * 
     * This function is used to fetch all members data
     * 
     * @param page 
     */
  async function fetchAllDepartmentSearch(page:number) {
    setLoading(true)
    if(Cookies.get('token')){
      const response = await listDepartmentPagination(page, departmentName ?? '')
      if(response){
        setAllDepartment(response.data.data)
        setCurrentPage(response.data.currentPage)
        setTotalRow(response.data.total)
        setLoading(false)
      }
    }
  }

  const columns = [
    {
      name: 'Department Name',
      selector: (row: any) => row.name
    },
    {
      name: 'Department Code',
      selector: (row: any) => row.code
    },
    {
      name: 'Action',
      cell: (row: any) => 
      (
        <>
          <Button size='small' variant='contained' href={`/department-management/edit-department/${row.id}`} sx={{color: "white!important"}}>
            Edit
          </Button>
          <Button variant='contained' color='error' size='small' onClick={() => confirmDelete(row)} sx={{marginX: "5px", color: "white!important"}}>
            Delete
          </Button>
        </>
      )
    }
  ]


  useEffect(() => {
    fetchAllDepartment(currentPage)
  },[fetchAllDepartment])

  return (
    <div>
      <h1>Department Management</h1>
      <Box
        sx={{
          marginY: '10px',
          padding: '10px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Search Bar */}
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          {hidden ? (
            <IconButton color='inherit' onClick={toggleNavVisibility} sx={{ ml: -2.75, mr: 3.5 }}>
              <Menu />
            </IconButton>
          ) : null}
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, width: '500px' }}
            onChange={(e) => setDepartmentName(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
          <Button size='small' variant='contained' sx={{ color: 'white!important' }} onClick={() => fetchAllDepartmentSearch(1)}>
            <div>Search</div>
          </Button>
        </Box>
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Add User Button */}
          <Button variant='contained' href='/department-management/create-department'>
            Add
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {DisplayDataTable(columns, allDepartment, loading, totalRow, currentPage, handlePageChange)}
      </Paper>
    </div>
  )
}

export default Departmentlist
