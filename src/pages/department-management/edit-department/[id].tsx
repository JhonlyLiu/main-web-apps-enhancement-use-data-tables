// ** React Imports
// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useCallback, useEffect, useState } from 'react'
import { departmentDetail, updateDepartment } from 'src/main/services/DepartmentManagement'
// import Select from 'react-select';
import { listRole } from 'src/main/services/RoleManagement'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'
import { FormControl, InputLabel, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const EditDepartment = () => {
  const [departmentName, setDepartmentName] = useState("")
  const [departmentCode, setDepartmentCode] = useState("")
  const [departmentRole, setDepartmentRole] = useState<string[]>([])
  const [allRole, setAllRole] = useState([])

  const router = useRouter()

  const handleSelectRole = async (e: SelectChangeEvent<string[]>) => {
    setDepartmentRole(e.target.value as string[])
  }

  const getRoles = async () => {
    const response = await listRole(1, "")
    const result = response.data.data.map((element: any) => {
      return {
        label: element.name,
        value: element.id
      }
    })
    setAllRole(result)
    console.log(allRole)
  }

  async function handleSubmit(e: any){
    e.preventDefault()
    let currentDepartmentId = window.location.pathname.split("/").pop() as string
    const response = await updateDepartment(currentDepartmentId, departmentName, departmentCode, departmentRole)
    console.log(departmentRole)
    await Swal.fire({
      text: response.message,
      icon: response.status ? "success" : "error"
    })
    if(response.status){
      router.push('/department-management/list-department')
    }
  }

  const fetchDepartment = useCallback(async (): Promise<void> => {
    let currentDepartmentId = window.location.pathname.split("/").pop() as string
    const response = await departmentDetail(currentDepartmentId)
    setDepartmentName(response.data.name)
    setDepartmentCode(response.data.code)
  },[])

  useEffect(() => {
    fetchDepartment()
    getRoles()
  },[fetchDepartment])

  return (
    <Card>
      <CardHeader title='Edit Department' titleTypographyProps={{ textAlign: 'center'}}/>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item xs={12} sm={3}>
              <label htmlFor='departmentName'>Department Name</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='departmentName' value={departmentName} onChange={(e) => setDepartmentName(e.target.value)} sx={{padding: 0}} required/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='Code'>Code</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='Code' value={departmentCode} onChange={(e) => setDepartmentCode(e.target.value)} sx={{padding: 0}} required/>
            </Grid>
            <Grid item xs={12} sm={3}>
                <label htmlFor='role'>Role</label>
              </Grid>
              <Grid item xs={12} sm={9}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Role</InputLabel>
                <Select
                  label='Role'
                  multiple
                  value={departmentRole}
                  id='form-layouts-separator-select'
                  onChange={handleSelectRole}
                  labelId='form-layouts-separator-select-label'
                >
                  {
                    allRole.map((element: any) => {
                      return (
                        <MenuItem value={element.value}>{element.label}</MenuItem>
                      )
                    })
                  }
                </Select>
              </FormControl>
              </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'end'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button variant='contained' color='secondary' sx={{margin: '5px'}}>Cancel</Button>
                  <Button type='submit' variant='contained' color='primary' sx={{margin: '5px'}}>Save</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default EditDepartment