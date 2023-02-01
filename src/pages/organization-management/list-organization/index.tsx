// ** React Imports
import { useCallback, useEffect, useState } from 'react'

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
import {
  deleteOrganization,
  listOrganization,
  listOrganizationPagination
} from 'src/main/services/OrganizationalManagement'
import Link from 'next/link'

interface Column {
  id: 'organization' | 'code' | 'address' | 'status'
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
  { id: 'organization', label: 'Organization Name' },
  { id: 'code', label: 'Organization Code', align: 'center' },
  { id: 'address', label: 'Organization Address', align: 'center' },
  {
    id: 'status',
    label: 'Status',
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  }
]

interface OrganizationData {
  data: Data[]
  total: number
}

interface Data {
  id: string
  name: string
  code: string
  address: string
  status: boolean
}

const OrganizationList = (props: Props) => {
  // ** Props
  const { hidden, toggleNavVisibility } = props

  // ** States
  const [allData, setAllData] = useState<OrganizationData>()

  const [page, setPage] = useState<number>(1)

  const [search, setSearch] = useState<string>("")

  async function handleListOrganization () {
    try {
      const response = await listOrganizationPagination(page, search)

      setAllData({"data": [], "total": 0})
      setAllData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleListOrganization()
  }, [])

  async function onDelete(id: string) {
    try {
      await deleteOrganization(id)
      await handleListOrganization()
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

  async function onClickSearchButton() {
    setPage(1);

    await handleListOrganization()
  }

  const router = useRouter()

  const confirmDelete = (row: Data) => {
    Swal.fire({
      title: 'Are you sure want to delete this organization?',
      text: 'This will remove organization and all data associated with it',
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

  return (
    <div>
      <GlobalStyles styles={{ btn: { color: 'whitesmoke' } }} />
      <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 8 }}>
        Organization Management
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
            <IconButton color='inherit' sx={{ ml: -2.75, mr: 3.5 }}>
              <Menu />
            </IconButton>
          ) : null}
          <TextField
            size='small'
            onChange={event => setSearch(event.target.value)}
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 }, width: '500px' }}
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
          <Button variant='contained' onClick={() => router.push('/organization-management/create-organization')}>
            Add
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
              {allData?.data.map((row: Data) => (
                <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align='center'>{row.code}</TableCell>
                  <TableCell align='center'>{row.address}</TableCell>
                  <TableCell align='center'>
                    {row.status == true ? (
                      <Chip color='success' label='ACTIVE' sx={{ height: 24, fontSize: '0.75rem' }} />
                    ) : (
                      <Chip color='error' label='INACTIVE' sx={{ height: 24, fontSize: '0.75rem' }} />
                    )}
                  </TableCell>
                  <TableCell align='center'>
                    <Button size='small' variant='contained' sx={{ color: 'white!important' }}>
                      <Link
                        href={{
                          pathname: '/organization-management/edit-organization',
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
                      onClick={() => {
                        confirmDelete(row)
                      }}
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
              console.log("Change target: " + value)
              setPage(value);
              await handleListOrganization()
            }}
          />
        </Box>
      </Paper>
    </div>
  )
}

export default OrganizationList
