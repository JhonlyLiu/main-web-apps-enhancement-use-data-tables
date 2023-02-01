// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
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
import { Pagination } from '@mui/material'
import { deleteUser, listUser, suspendUser } from 'src/main/services/UserManagement'
import Cookies from 'js-cookie'
import DisplayDataTable from 'src/components/global/DataTables'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const UserList = (props: Props) => {
  // ** Props
  const { hidden, toggleNavVisibility } = props

  // ** States
  const [allUser, setAllUser] = useState([] as any [])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalRow, setTotalRow] = useState(0)
  const [userName, setuserName] = useState('')

  /**
   * handlePageChange
   * @param page 
   */
  const handlePageChange = (page: any) => {
    fetchAllUser(page)
  }

  /**
     * initially fetch All Members 
     * 
     * This function is used to fetch all members data
     * 
     * @param page 
     */
  const fetchAllUser = useCallback(async (page: any): Promise<void> => {
    setLoading(true)
    if(Cookies.get('token')){
      const response = await listUser(page, userName ?? '')
      if(response.status){
        setAllUser(response.data.data)
        setCurrentPage(response.data.current_page)
        setTotalRow(response.data.total)
        setLoading(false)
      }
    }
  },[])

  /**
     * fetch All Members Search
     * 
     * This function is used to fetch all members data that serached
     * 
     * @param page 
     * @param search 
     */
    async function fetchAllUserSearch (page: number): Promise<void> {
      setLoading(true)
      const response = await listUser(page, userName ?? '')
      if(response.status){
        setAllUser(response.data.data)
        setCurrentPage(response.data.current_page)
        setTotalRow(response.data.total)
        setLoading(false)
      }
    }

    /**
     * confirmSuspend
     * handle give alert when user want to be suspended and hit API to suspend user
     * @param row 
     */
  const confirmSuspend = (row:any) => {
    Swal.fire({
      title: 'Are you sure want to suspend this user?',
      text: 'This user will not be able to access this aplication !',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      icon: 'warning'
    }).then((result) => {
      if(result.isConfirmed){
        const suspend = async () => {
          await suspendUser(row.id)
        }
        suspend()
      }
    })
  }

  /**
   * onChangeSearchUserNameText
   * handle set user name for search
   * @param e 
   */
  async function onChangeSearchUserNameText(e: React.ChangeEvent<HTMLInputElement>){
    setuserName(e.target.value)
  }

  const columns = [
    {
      name: 'Fullname',
      selector: (row: any) => row.numa_tbl_user_roleame
    },
    {
      name: 'UserName',
      selector: (row: any) => row.username
    },
    {
      name: 'Employee Number',
      selector: (row: any) => row.employee_no
    },
    {
      name: 'Status',
      selector: (row: any) => 
      (
        row.user_status == "Active" 
        ?
        <Button onClick={() => confirmSuspend(row)}>
          <Chip color='success' label="ACTIVE" sx={{height: 24, fontSize: '0.75rem'}}/>
        </Button>
        :
        <Chip color='error' label="SUSPENDED" sx={{height: 24, fontSize: '0.75rem'}}/>
      )
    },
    {
      name: 'Action',
      cell: (row: any) =>
      (
        <Box sx={{objectFit: 'contain'}}>
          <Button size='small' variant='contained' href={`/user-management/edit-user${row.id}`} sx={{color: "white!important"}}>
            Edit
          </Button>
          <Button variant='contained' color='error' size='small' onClick={() => confirmDelete(row)} sx={{marginX: "5px", color: "white!important"}}>
            Delete
          </Button>
          {row.user_status == 'Active'
          ? 
          <Button size='small' variant='contained' color='success' sx={{color: "white!important"}} onClick={() => confirmSuspend(row)}>
            Suspend
          </Button>
          :
          <></>
          }
        </Box>
      )
    }
  ]

  /**
   * confirmDelete
   * handle give alert when user want to be deleted and hit API to delete user
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
        const delUser = async () => {
          await deleteUser(row.id)
        }
        delUser()
      }
    })
  }

  useEffect(() => {
    fetchAllUser(currentPage)
  }, [fetchAllUser])

  return (
    <div>
      <h1>User Management</h1>
      <Box sx={{marginY: "10px", padding: "10px", width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        {/* Search Bar */}
        <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
          {hidden ? (
            <IconButton
              color='inherit'
              onClick={toggleNavVisibility}
              sx={{ ml: -2.75, mr: 3.5  }}
            >
              <Menu />
            </IconButton>
          ) : null}
          <TextField
            size='small'
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, width: "500px" }}
            onChange={onChangeSearchUserNameText}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
           <Button size='small' variant='contained' sx={{ color: 'white!important' }} onClick={() => fetchAllUserSearch(1)}>
            <div>Search</div>
          </Button>
        </Box>
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Add User Button */}
          <Button variant='contained' href='/user-management/create-user'>
            Add User
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {DisplayDataTable(columns, allUser, loading, totalRow, currentPage, handlePageChange)}
      </Paper>
    </div>
  )
}

export default UserList