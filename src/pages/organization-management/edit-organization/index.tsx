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
  Typography,
  TextareaAutosize
} from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { listOrganization, organizationDetail, updateOrganization } from 'src/main/services/OrganizationalManagement'

import { useRouter } from 'next/router'
import { encode } from 'querystring'
import { ConsoleNetworkOutline } from 'mdi-material-ui'

interface Organization {
  id: string
  name: string
  code: string
  address: string
  status: boolean
}

const EditOrganization = () => {
  //----------------------------------------------------------------------
  // State Part

  /**
   * State Part
   *
   * There are some states to be fulfilled with type of
   * @see Organization
   */

  // id => The id of Organization
  const [id, setId] = useState<string>('')

  // name => The name of Organization
  const [name, setName] = useState<string>('')

  // code => The unique code for an Organization
  const [code, setCode] = useState<string>('')

  // address => The full address for an Organization
  const [address, setAddress] = useState<string>('')

  // status => The status of the organization (true for active, false for inactive)
  const [status, setStatus] = useState<boolean>(true)

  // router => Router object
  const router = useRouter()

  const data = router.query
  const idFromParams = encode(data)

  //----------------------------------------------------------------------
  // Page Operations

  /**
   * handleEditOrganization
   *
   * This function handle the edit action for organization data.
   *
   * When success, do response redirect to /organization-management/list-organization
   * When failure, print error.
   */
  async function onClickHandleSubmitButton() {
    try {
      const res = await updateOrganization(id, name, code, address, status)
      if (res.code === '200') {
        router.push('/organization-management/list-organization')
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * handleDetailOrganization
   *
   * This function will get data from API regarding the organization detail.
   *
   * When success, update organization detail state.
   * @todo When failure, throw back to list-organization
   */
  const handleDetailOrganization = useCallback(async () => {
    try {
      const response = await organizationDetail(idFromParams.split('=')[0])
      const data = response.data

      setId(data.id)
      setName(data.name)
      setCode(data.code)
      setAddress(data.address)
      setStatus(data.status)
    } catch (err) {
      router.back()
    }
  }, [])

  //----------------------------------------------------------------------
  // Web Engine
  // Initialization Part

  useEffect(() => {
    handleDetailOrganization()
  }, [handleDetailOrganization])

  function setOrganizationActiveStatus() {
    return status ? 'active' : 'inactive'
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader />
          <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
            Edit Organization
          </Typography>
          <CardContent>
            <Grid container alignItems='center' spacing={2} sx={{ paddingRight: 15, paddingLeft: 15 }}>
              <Grid item xs={4}>
                <p>Organization Name</p>
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
                <p>Address</p>
              </Grid>
              <Grid item xs={8}>
                <TextareaAutosize
                  id='outlined-required'
                  aria-label='minimum height'
                  minRows={5}
                  style={{ width: '100%' }}
                  defaultValue={address}
                  onChange={event => setAddress(event.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <p>Status</p>
              </Grid>
              <Grid item xs={8}>
                <RadioGroup
                  defaultValue={setOrganizationActiveStatus()}
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

export default EditOrganization
