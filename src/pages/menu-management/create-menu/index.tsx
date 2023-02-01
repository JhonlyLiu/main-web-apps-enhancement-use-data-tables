// ** Type Import
import { Settings } from 'src/main/@core/context/settingsContext'

// ** Other Import
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material'

import { FaUserNurse, FaUserTie, FaUserMd } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import router from 'next/router'
import {createMenu, listAllMenu, listMenu} from 'src/main/services/MenuManagement'

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

const CreateMenu = () => {
  const [name, setName] = useState<string>('')
  const [parent_id, setParent_id] = useState<string>('')
  const [link, setLink] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [icon, setIcon] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  // const [status] = useState<boolean>(false)
  const [allData, setAllData] = useState<MenuData>()

  async function handleListMenu() {
    try {
      const response = await listAllMenu()
      console.log(response.data)
      setAllData(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleAddMenu(name: string, parent_id: string, link: string, description: string, icon: string) {
    try {
      const res = await createMenu(name, parent_id, link, description, icon)
      if (res.code === '200') {
        resetForm()
        router.push('/menu-management/list-menu')
      }
    } catch (err) {
      console.log(err)
    }
  }
  function resetForm() {
    setName('')
    setParent_id('')
    setLink('')
    setDescription('')
    setIcon('')
    setStatus('')
  }

  useEffect(() => {
    handleListMenu()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader />
          <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
            Create Menu
          </Typography>
          <CardContent>
            <Grid container alignItems='center' spacing={2} sx={{ paddingRight: 15, paddingLeft: 15 }}>
              <Grid item xs={4}>
                <p>Menu Name</p>
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
                <p>Menu Parent</p>
              </Grid>
              <Grid item xs={8}>
                <Select fullWidth size='small'>
                  {allData?.data.map((row: Data) => (
                    <MenuItem value={row.parent_id}>{row.parent_id}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <p>Menu Link</p>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  required
                  fullWidth
                  size='small'
                  id='outlined-required'
                  value={link}
                  onChange={event => setLink(event.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <p>Icon</p>
              </Grid>
              <Grid item xs={8}>
                <Select fullWidth size='small'>
                  {allData?.data.map((row: Data) => (
                    <MenuItem value={row.icon}>{row.icon}</MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={4}>
                <p>Description</p>
              </Grid>
              <Grid item xs={8}>
                <TextareaAutosize
                  id='outlined-required'
                  aria-label='minimum height'
                  minRows={5}
                  style={{ width: '100%' }}
                  value={description}
                  onChange={event => setDescription(event.target.value)}
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
                    onClick={() => handleAddMenu(name, parent_id, link, description, icon)}
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

export default CreateMenu
