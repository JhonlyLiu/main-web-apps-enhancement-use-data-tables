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
import { GlobalStyles, Typography, Pagination, Paper } from '@mui/material'
import { deleteMenu, listMenu } from 'src/main/services/MenuManagement'
import Link from 'next/link'
import { Link as MuiLink } from '@mui/material'
import DisplayDataTable from 'src/components/global/DataTables'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const MenuList = (props: Props) => {
  // ** Props
  const { hidden, toggleNavVisibility } = props
  const router = useRouter()

  // ** States
  const [allMenu, setAllMenu] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalRow, setTotalRow] = useState(0)
  const [menuName, setMenuName] = useState('')

  const fetchAllMenu = useCallback(async (page: number): Promise<void> => {
    setLoading(true)
    try {
      const response = await listMenu(page, menuName ?? '')
      setAllMenu(response.data.data)
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
    fetchAllMenu(page)
  }

  async function onDelete(id: string) {
    try {
      await deleteMenu(id)
      await fetchAllMenu(currentPage)
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * confirmDelete
   * handle give alert when menu want to be deleted and hit API to delete menu
   * @param row
   */

  const confirmDelete = (row: any) => {
    Swal.fire({
      title: 'Are you sure want to delete this menu?',
      text: 'This will remove menu and all data associated with it',
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

  async function onClickSearchButton() {
    setCurrentPage(1)
    await fetchAllMenu(currentPage)
  }

  useEffect(() => {
    fetchAllMenu(currentPage)
  }, [fetchAllMenu])

  const columns = [
    {
      name: 'Organization Name',
      selector: (row: any) => row.name
    },
    {
      name: 'Menu Parent',
      selector: (row: any) => row.parent_id
    },
    {
      name: 'Menu Link',
      selector: (row: any) => row.link
    },
    {
      name: 'Icon',
      selector: (row: any) => row.icon
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
          <Button size='small' variant='contained' sx={{ color: 'white!important' }}>
            <Link
              href={{
                pathname: '/menu-management/edit-menu',
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
            sx={{ marginX: '1px', color: 'white!important' }}
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
        Menu Management
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
          <Button variant='contained' onClick={() => router.push('/menu-management/create-menu')}>
            Add Menu
          </Button>
        </Box>
      </Box>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        {DisplayDataTable(columns, allMenu, loading, totalRow, currentPage, handlePageChange)}
      </Paper>
    </div>
  )
}

export default MenuList
