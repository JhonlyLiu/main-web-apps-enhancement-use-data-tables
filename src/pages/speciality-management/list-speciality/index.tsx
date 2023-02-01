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

// **Next Import
import { useRouter } from 'next/router'

// ** Type Import
import { Settings } from 'src/main/@core/context/settingsContext'

// ** Other Import
import Swal from 'sweetalert2'
import { deleteSpecialist, listSpecialistPagination } from 'src/main/services/SpecialistManagement'
import Cookies from 'js-cookie'
import DisplayDataTable from 'src/components/global/DataTables'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const SpecialityList = (props: Props) => {
  // ** Props
  const { hidden, toggleNavVisibility } = props
  // ** States
  const [allSpecialities, setAllSpecialities] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalRow, setTotalRow] = useState(0)
  const [specialityName, setSpecialityName] = useState('')

   // ** Hook
   const router = useRouter()

  /**
   * handlePageChange
   * @param page 
   */
  const handlePageChange = (page: any) => {
    fetchAllSpecialities(page)
  }

  async function onChangeSearchSpecialityTitleText(e:React.ChangeEvent<HTMLInputElement>) {
    setSpecialityName(e.target.value)
  }

  /**
   * confirmDelete
   * delete speciality
   * @param row 
   */
  const confirmDelete = (row:any) => {
    Swal.fire({
      title: 'Are you sure want to delete this speciality?',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      icon: 'warning'
    }).then((result) => {
      if(result.isConfirmed){
        const specialityDel = async () => {
          await deleteSpecialist(row.id)
          window.location.reload()
        }
        specialityDel()
      }
    })
  }

  /**
     * fetch All department
     * 
     * This function is used to fetch all members data initially
     * 
     * @param page 
     */
  const fetchAllSpecialities = useCallback(async (page: any): Promise<void> => {
    setLoading(true)
    if(Cookies.get('token')){
      const response = await listSpecialistPagination(page, specialityName ?? '')
      if(response){
        setAllSpecialities(response.data.data)
        setCurrentPage(response.data.current_page)
        setTotalRow(response.data.total)
        setLoading(false)
      }
    }
  },[])

  /**
     * fetch All department Search
     * 
     * This function is used to fetch all members data that searched
     * 
     * @param page 
     */
  async function fetchAllSpecialitiesSearch(page:number) {
    setLoading(true)
    if(Cookies.get('token')){
      const response = await listSpecialistPagination(page, specialityName ?? '')
      if(response){
        setAllSpecialities(response.data.data)
        setCurrentPage(response.data.current_page)
        setTotalRow(response.data.total)
        setLoading(false)
      }
    }
  }

  const columns = [
    {
      name: 'Speciality Name',
      selector: (row: any) => row.name
    },
    {
      name: 'Speciality Code',
      selector: (row: any) => row.code
    },
    {
      name: 'Action',
      cell: (row: any) => 
      (
        <>
          <Button size='small' variant='contained' href={`/speciality-management/edit-speciality/${row.id}`} sx={{color: "white!important"}}>
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
    fetchAllSpecialities(currentPage)
  },[fetchAllSpecialities])

  return (
    <div>
      <h1>Speciality Management</h1>
      <Box sx={{marginY: "10px", padding: "10px", width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {/* Search Bar */}
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
            <IconButton color='inherit' onClick={toggleNavVisibility} sx={{ ml: -2.75, mr: 3.5 }}>
              <Menu />
            </IconButton>
          ) : null}
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, width: "500px" }}
            value={specialityName}
            onChange={onChangeSearchSpecialityTitleText}
          />
          <Button size='small' variant='contained' sx={{ color: 'white!important' }} onClick={() => fetchAllSpecialitiesSearch(1)}>
            Search
          </Button>
        </Box>
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Add User Button */}
          <Button variant='contained' href='/speciality-management/create-speciality'>
            Add
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {DisplayDataTable(columns, allSpecialities, loading, totalRow, currentPage, handlePageChange)}
      </Paper>
    </div>
  )
}

export default SpecialityList