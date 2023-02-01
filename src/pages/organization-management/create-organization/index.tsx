// ** Type Import
import { Settings } from 'src/main/@core/context/settingsContext'

// ** Other Import
import { Button, Card, CardContent, CardHeader, Grid, TextField, Typography, TextareaAutosize } from '@mui/material'
import { createOrganization } from 'src/main/services/OrganizationalManagement'
import { useState } from 'react'
import { useRouter } from 'next/router'

const CreateOrganization = () => {
  const [name, setName] = useState<string>('')

  const [code, setCode] = useState<string>('')

  const [address, setAddress] = useState<string>('')
  const [status] = useState<boolean>(false)
  const router = useRouter()

  async function handleAddOrganization(name: string, code: string, address: string, status: boolean) {
    try {
      const res = await createOrganization(name, code, address, status)
      if (res.code === '200') {
        resetForm()
        router.push('/organization-management/list-organization')
      }
    } catch (err) {
      console.log(err)
    }
  }
  function resetForm() {
    setName('')
    setCode('')
    setAddress('')
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader />
          <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
            Create Organization
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
                  value={address}
                  onChange={event => setAddress(event.target.value)}
                />
              </Grid>
              <CardHeader />
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
                  <Button
                    variant='contained'
                    color='primary'
                    type='submit'
                    onClick={() => handleAddOrganization(name, code, address, status)}
                  >
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

export default CreateOrganization
