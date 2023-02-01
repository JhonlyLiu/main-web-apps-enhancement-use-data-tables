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
import { GlobalStyles, Pagination, Typography } from '@mui/material'
import { deleteRole, listRole } from 'src/main/services/RoleManagement'
import { TruckDelivery } from 'mdi-material-ui'
import Link from 'next/link'

interface Column {
  id: 'role' | 'code' | 'status'
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
  { id: 'role', label: 'Role' },
  {
    id: 'code',
    label: 'Code',
    align: 'center'
  },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  }
]

interface Data {
  id: string
  name: string
  code: string
  status: boolean
}

const RoleList = (props: Props) => {
  // ** Props
  const { hidden, toggleNavVisibility } = props

  // ** States
  const [allData, setAllData] = useState<Data[]>()

  const [page, setPage] = useState<number>(1)

  const [search, setSearch] = useState<string>("")

  async function handleListRole() {
    const getListRole = async () => {
      const response = await listRole(page, search)
      console.log(response.data)
      setAllData(response.data.data)
    }
    getListRole()
  }

  async function onClickSearchButton() {
    setPage(1);

    await handleListRole()
  }

  // export async function listRole(page: number, search: string) {
  //   let finalUri = USER_MANAGEMENT_URI + '/v1/role/list?page=' + page + '&per_page=1&search=' + search
  //   return ApiHandler.handleRequest('GET', finalUri)
  // }

  // const getRole = async () => {
  //   const response = await listRole(1, '')
  //   const result = response.data.data.map((element: any) => {
  //     return {
  //       label: element.name,
  //       value: element.id
  //     }
  //   })
  //   setAllRole(result)
  // }

  const router = useRouter()

  async function onDelete(id: string) {
    try {
      await deleteRole(id)
      await handleListRole()
    } catch (err) {
      console.log(err)
    }
  }

  function countTotalPagination(totalData: number) {
    const total = Math.floor(totalData / 10)
    if (totalData % 10 === 0) {
      return total
    } else {
      return total + 1
    }
  }

  const confirmDelete = (row: Data) => {
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
    handleListRole()
  }, [])

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
          <Button variant='contained' onClick={() => router.push('/role-management/create-role')}>
            Add Role
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
                <TableCell align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allData?.map((row: Data) => (
                <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='center'>{row.code}</TableCell>
                  <TableCell align='center'>
                    {row.status ? (
                      <Chip color='success' label='ACTIVE' sx={{ height: 24, fontSize: '0.75rem' }} />
                    ) : (
                      <Chip color='error' label='INACTIVE' sx={{ height: 24, fontSize: '0.75rem' }} />
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    <Button
                      size='small'
                      variant='contained'
                      href='/role-management/edit-role'
                      sx={{ color: 'white!important' }}
                    >
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'end', padding: '5px' }}>
          <Pagination
            count={countTotalPagination(10)}
            page={page}
            onChange={async (e, value) => {
              console.log("Change target: " + value)
              setPage(value);
              await handleListRole()
            }}
          />
        </Box>
      </Paper>
    </div>
  )
}

export default RoleList
