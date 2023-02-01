// ** Type Import
import { Settings } from 'src/main/@core/context/settingsContext'

// ** Other Import
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Select,
  MenuItem,
  Typography,
  TableRow,
  TableCell,
  Checkbox,
  TableHead,
  TableContainer,
  Table,
  Paper
} from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { detailRole, updateRole } from 'src/main/services/RoleManagement'
import { useRouter } from 'next/router'
import { encode } from 'querystring'

interface Role {
  id: string
  name: string
  code: string
  status: boolean
}

const EditRole = () => {
  //----------------------------------------------------------------------
  // State Part

  /**
   * State Part
   *
   * There are some states to be fulfilled with type of
   * @see Role
   */

  // id => The id of Role
  const [id, setId] = useState<string>('')

  // name => The name of Role
  const [name, setName] = useState<string>('')

  // code => The unique code for an Role
  const [code, setCode] = useState<string>('')

  // status => The status of the Role (true for active, false for inactive)
  const [status, setStatus] = useState<boolean>(false)

  const [permission, setPermission] = useState([])
  const [rolePermission, setRolePermission] = useState([])

  const listMenu = [
    {
      value: 'user_management',
      deskripsi: 'User Management'
    },
    {
      value: 'role_management',
      deskripsi: 'Role Management'
    }
  ]
  // router => Router object
  const router = useRouter()

  const data = router.query
  const idFromParams = encode(data)

  //----------------------------------------------------------------------
  // Page Operations

  /**
   * handleEditRole
   *
   * This function handle the edit action for role data.
   *
   * When success, do response redirect to /role-management/list-role
   * When failure, print error.
   */
  async function onClickHandleSubmitButton() {
    try {
      const res = await updateRole(id, name, code, status)
      if (res.code === '200') {
        router.push('/role-management/list-role')
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * handleDetailRole
   *
   * This function will get data from API regarding the role detail.
   *
   * When success, update role detail state.
   * @todo When failure, throw back to list-role
   */
  const handleDetailRole = useCallback(async () => {
    try {
      const response = await detailRole(idFromParams.split('=')[0])
      const data = response.data

      setId(data.id)
      setName(data.name)
      setCode(data.code)
      setStatus(data.status)
    } catch (err) {
      // router.back()
    }
  }, [])

  //----------------------------------------------------------------------
  // Web Engine
  // Initialization Part

  useEffect(() => {
    handleDetailRole()
  }, [handleDetailRole])

  function setRoleActiveStatus() {
    return status ? 'active' : 'inactive'
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader />
          <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
            Edit Role
          </Typography>
          <CardContent>
            <Grid container alignItems='center' spacing={2} sx={{ paddingRight: 15, paddingLeft: 15 }}>
              <Grid item xs={4}>
                <p>Role Name</p>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  size='small'
                  id='outlined-required'
                  value={name}
                  onChange={event => setName(event.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <p>Code</p>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  size='small'
                  id='outlined-required'
                  value={code}
                  onChange={event => setCode(event.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <p>Menu Permission</p>
              </Grid>
              <Grid item xs={8}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650, marginBottom: 7 }} aria-label='sticky table'>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>Menu</TableCell>
                        <TableCell align='center'>Permission</TableCell>
                      </TableRow>
                    </TableHead>
                    {listMenu.map(item => {
                      return (
                        <TableRow key={item.value}>
                          <TableCell align='center'>{item.deskripsi}</TableCell>
                          <TableCell align='center'>
                            <FormControlLabel
                              value='create'
                              control={<Checkbox />}
                              label='Create'
                              labelPlacement='start'
                            />
                            <FormControlLabel value='view' control={<Checkbox />} label='View' labelPlacement='start' />
                            <FormControlLabel value='edit' control={<Checkbox />} label='Edit' labelPlacement='start' />
                            <FormControlLabel
                              value='view'
                              control={<Checkbox />}
                              label='Delete'
                              labelPlacement='start'
                            />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={4}>
                <p>Status</p>
              </Grid>
              <Grid item xs={8}>
                <RadioGroup
                  defaultValue={setRoleActiveStatus()}
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                >
                  <FormControlLabel
                    value='active'
                    control={<Radio onChange={value => setStatus(true)} />}
                    label='Active'
                  />
                  <FormControlLabel
                    value='inactive'
                    control={<Radio onChange={value => setStatus(false)} />}
                    label='Inactive'
                  />
                </RadioGroup>
              </Grid>
              <Grid container spacing={2} justifyContent={'right'}>
                <Grid item>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => {
                      router.back()
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='contained' color='primary' type='submit' onClick={() => onClickHandleSubmitButton()}>
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default EditRole
