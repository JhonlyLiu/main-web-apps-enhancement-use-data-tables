// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
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
import { GlobalStyles, Typography, Pagination } from '@mui/material'
import { deleteMenu, listMenu } from 'src/main/services/MenuManagement'
import Link from 'next/link'
import { Link as MuiLink } from '@mui/material'

interface Column {
  id: 'menuname' | 'menuparent' | 'menulink' | 'icon' | 'status'
  label: string
  minWidth?: number
  align?: 'center'
  format?: (value: number) => string
}

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const columns: readonly Column[] = [
  { id: 'menuname', label: 'Menu Name' },
  { id: 'menuparent', label: 'Menu Parent', align: 'center' },
  { id: 'menulink', label: 'Menu Link', align: 'center' },
  { id: 'icon', label: 'Icon', align: 'center' },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  }
]

interface MenuData {
  data: Data[]
  total: number
}

interface Data {
  id: string
  name: string
  parent_id: string
  link: string
  icon: string
  status: boolean
}

const MenuList = (props: Props) => {
  // ** Props
  const { hidden, toggleNavVisibility } = props

  const router = useRouter()

  // ** States
  const [allData, setAllData] = useState<MenuData>()

  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>("")


  async function handleListMenu() {
    try {
      const response = await listMenu(page, search)

      // Refresh Data
      setAllData({"data": [], "total": 0})
      setAllData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  async function onDelete(id: string) {
    try {
      await deleteMenu(id)
      await handleListMenu()
    } catch (err) {
      console.log(err)
    }
  }

  const confirmDelete = (row: Data) => {
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
    setPage(1);

    await handleListMenu()
  }

  function countTotalPagination(totalData: number) {
    const total = Math.floor(totalData / 10)
    if (totalData % 10 === 0) {
      return total
    } else {
      return total + 1
    }
  }

  useEffect(() => {
    handleListMenu()
  }, [])

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
            onChange={event => setSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Magnify fontSize='small' />
                </InputAdornment>
              )
            }}
          />
          <Button size='small' variant='contained' sx={{ color: 'white!important' }} onClick={() => onClickSearchButton()}>
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
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align='center' sx={{ minWidth: 200 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData?.data.map((row: Data) => (
                <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='center'>{row.parent_id}</TableCell>
                  <TableCell align='center'>
                    <MuiLink onClick={() => router.push(row.link)}>{row.link}</MuiLink>
                  </TableCell>
                  <TableCell align='center'>{row.icon}</TableCell>
                  <TableCell align='center'>
                    {row.status ? (
                      <Chip color='success' label='ACTIVE' sx={{ height: 24, fontSize: '0.75rem' }} />
                    ) : (
                      <Chip color='error' label='INACTIVE' sx={{ height: 24, fontSize: '0.75rem' }} />
                    )}
                  </TableCell>
                  <TableCell align='center'>
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
                      sx={{ marginX: '5px', color: 'white!important' }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'end', padding: '5px' }}>
          <Pagination
            count={countTotalPagination(allData?.total ?? 1)}
            page={page}
            onChange={async (e, value) => {
              setPage(value);
              await handleListMenu()
            }}
          />
        </Box>
      </Paper>
    </div>
  )
}

export default MenuList
