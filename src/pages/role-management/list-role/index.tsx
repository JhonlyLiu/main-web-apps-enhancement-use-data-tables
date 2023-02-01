// ** React Imports
import { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

// ** MUI Imports
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
import { GlobalStyles, Paper, Typography } from '@mui/material'
import { deleteRole, listRole } from 'src/main/services/RoleManagement'
import Link from 'next/link'
import DisplayDataTable from 'src/components/global/DataTables'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const RoleList = (props: Props) => {
  // ** Props
  const { hidden, toggleNavVisibility } = props

  // ** States
  const [allRole, setAllRole] = useState([] as any[])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalRow, setTotalRow] = useState(0)
  const [roleName, setRoleName] = useState('')

  const fetchAllRole = useCallback(async (page: number): Promise<void> => {
    setLoading(true)
    try {
      const response = await listRole(page, roleName ?? '')
      setAllRole(response.data.data)
      setCurrentPage(response.data.currentPage)
      setTotalRow(response.data.total)
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }, [])

  /**
   * handlePageChange
   * @param page
   */
  const handlePageChange = (page: any) => {
    fetchAllRole(page)
  }

  async function onClickSearchButton() {
    setCurrentPage(1)
    await fetchAllRole(currentPage)
  }

  const router = useRouter()

  async function onDelete(id: string) {
    try {
      await deleteRole(id)
      await fetchAllRole(currentPage)
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * confirmDelete
   * handle give alert when role want to be deleted and hit API to delete role
   * @param row
   */

  const confirmDelete = (row: any) => {
    Swal.fire({
      title: 'Are you sure want to delete this role?',
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      icon: 'warning'
    }).then((result: any) => {
      if (result.isConfirmed) {
        onDelete(row.id)
      }
    })
  }

  useEffect(() => {
    fetchAllRole(currentPage)
  }, [fetchAllRole])

  const columns = [
    {
      name: 'Organization Name',
      selector: (row: any) => row.name
    },
    {
      name: 'Organization Code',
      selector: (row: any) => row.code
    },
    {
      name: 'Status',
      selector: (row: any) =>
        row.status == true ? (
          <Chip color='success' label='ACTIVE' sx={{ height: 24, fontSize: '0.75rem' }} />
        ) : (
          <Chip color='error' label='INACTIVE' sx={{ height: 24, fontSize: '0.75rem' }} />
        )
    },

    {
      name: 'Action',
      cell: (row: any) => (
        <>
          <Button size='small' variant='contained' href='/role-management/edit-role' sx={{ color: 'white!important' }}>
            <Link
              href={{
                pathname: '/role-management/edit-role',
                query: row.id
              }}
            >
              <div>Edit</div>
            </Link>
          </Button>
          <Button
            variant='contained'
            color='error'
            size='small'
            onClick={() => confirmDelete(row)}
            sx={{ marginX: '5px', color: 'white!important' }}
          >
            Delete
          </Button>
        </>
      )
    }
  ]

  return (
    <div>
      <GlobalStyles styles={{ btn: { color: 'whitesmoke' } }} />
      <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 8 }}>
        Role Management
      </Typography>
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
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
          <Button
            size='small'
            variant='contained'
            sx={{ color: 'white!important' }}
            onClick={() => onClickSearchButton()}
          >
            <div>Search</div>
          </Button>
        </Box>
        <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Add User Button */}
          <Button variant='contained' onClick={() => router.push('/role-management/create-role')}>
            Add Role
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {DisplayDataTable(columns, allRole, loading, totalRow, currentPage, handlePageChange)}
      </Paper>
    </div>
  )
}

export default RoleList
