// ** Type Import
import { Settings } from 'src/main/@core/context/settingsContext'

// ** Other Import
import { Button, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { createRole } from 'src/main/services/RoleManagement'
import { useRouter } from 'next/router'

const CreateRole = () => {
  const [name, setName] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const router = useRouter()

  async function handleAddRole(name: string, code: string) {
    try {
      const res = await createRole(name, code)
      if (res.code === '200') {
        resetForm()
        router.push('/role-management/list-role')
      }
    } catch (err) {
      console.log(err)
    }
  }
  function resetForm() {
    setName('')
    setCode('')
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader />
          <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
            Create Role
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
                  <Button variant='contained' color='primary' type='submit' onClick={() => handleAddRole(name, code)}>
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

export default CreateRole
