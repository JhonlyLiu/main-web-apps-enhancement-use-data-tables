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
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material'

import { FaUserNurse, FaUserTie, FaUserMd } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { detailMenu, updateMenu } from 'src/main/services/MenuManagement'
import { encode } from 'querystring'

interface Menu {
  id: string
  name: string
  parent_id: string
  link: string
  status: boolean
  description: string
  icon: string
}

interface MenuData {
  data: Menu[]
  total: number
}

const EditMenu = () => {
  //----------------------------------------------------------------------
  // State Part

  /**
   * State Part
   *
   * There are some states to be fulfilled with type of
   * @see Menu
   */

  // id => The id of Menu
  const [id, setId] = useState<string>('')

  // name => The name of Menu
  const [name, setName] = useState<string>('')

  // parent_id => The unique parent id for an Menu
  const [parent_id, setParent_id] = useState<string>('')

  // link => The full link for an Menu
  const [link, setLink] = useState<string>('')

  // description => The full description for an Menu
  const [description, setDescription] = useState<string>('')

  // description => The full description for an Menu
  const [icon, setIcon] = useState<string>('')

  // status => The status of the Menu (true for active, false for inactive)
  const [status, setStatus] = useState<boolean>(true)

  // router => Router object
  const router = useRouter()

  // All Menu Data for Parent
  const [allData, setAllData] = useState<MenuData>()

  const data = router.query
  const idFromParams = encode(data)

  //----------------------------------------------------------------------
  // Page Operations

  /**
   * handleEditMenu
   *
   * This function handle the edit action for Menu data.
   *
   * When success, do response redirect to /Menu-management/list-Menu
   * When failure, print error.
   */
  async function onClickHandleSubmitButton() {
    try {
      const res = await updateMenu(id, name, parent_id, link, status, description, icon)
      if (res.code === '200') {
        router.push('/menu-management/list-menu')
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * handleDetailMenu
   *
   * This function will get data from API regarding the Menu detail.
   *
   * When success, update Menu detail state.
   * @todo When failure, throw back to list-Menu
   */
  const handleDetailMenu = useCallback(async () => {
    try {
      const response = await detailMenu(idFromParams.split('=')[0])
      const data = response.data

      setId(data.id)
      setName(data.name)
      setParent_id(data.parent_id)
      setLink(data.link)
      setDescription(data.description)
      setIcon(data.icon)
      setStatus(data.status)
    } catch (err) {
      router.back()
    }
  }, [])

  //----------------------------------------------------------------------
  // Web Engine
  // Initialization Part

  useEffect(() => {
    handleDetailMenu()
  }, [handleDetailMenu])

  function setMenuActiveStatus() {
    return status ? 'active' : 'inactive'
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader />
          <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>
            Edit Menu
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
                  {allData?.data.map((row: Menu) => (
                    <MenuItem value={row.parent_id}>{row.parent_id}</MenuItem>
                  ))}
                  <MenuItem value={'parent1'}>Parent1</MenuItem>
                  <MenuItem value={'parent2'}>Parent2</MenuItem>
                  <MenuItem value={'parent3'}>Parent3</MenuItem>
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
                  <MenuItem value={'FaUserTie'}>
                    <FaUserTie />
                  </MenuItem>
                  <MenuItem value={'FaUserMd'}>
                    <FaUserMd />
                  </MenuItem>
                  <MenuItem value={'FaUserNurse'}>
                    <FaUserNurse />
                  </MenuItem>
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
              <Grid item xs={4}>
                <p>Status</p>
              </Grid>
              <Grid item xs={8}>
                <RadioGroup
                  defaultValue={setMenuActiveStatus()}
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

export default EditMenu
