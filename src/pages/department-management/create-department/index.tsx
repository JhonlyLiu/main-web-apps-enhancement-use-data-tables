// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect, useState } from 'react'
import { createDepartment } from 'src/main/services/DepartmentManagement'
import Swal from 'sweetalert2'
import router from 'next/router'
import { listRole } from 'src/main/services/RoleManagement'
import Select from 'react-select';

const CreateDepartment = () => {
  const [departmentName, setDepartmentName] = useState("")
  const [departmentCode, setDepartmentCode] = useState("")
  const [allRole, setAllRole] = useState([])
  const [role, setRole] = useState<string[]>([])

  const handleSelectRole = async (e: any) => {
    setRole(e.value as string[])
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
  }

  async function handleSubmit(e: any){
    e.preventDefault()
    const addDepartment = async () => {
      const response = await createDepartment(departmentName, departmentCode, role)
      await Swal.fire({
        text: response.message,
        icon: response.status ? "success" : "error"
      })
      if(response.status){
        router.push('/department-management/list-department')
      }
    }
    addDepartment()
  }

  useEffect(() => {
    getRoles()
  },[])

  return (
    <Card>
      <CardHeader title='Create Department' titleTypographyProps={{ textAlign: 'center' }} />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item xs={12} sm={3}>
              <label htmlFor='departmentName'>Department Name</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='departmentName' onChange={(e) => {setDepartmentName(e.target.value)}} sx={{padding: 0}} required/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='Code'>Code</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='Code' onChange={(e) => setDepartmentCode(e.target.value)} sx={{padding: 0}} required/>
            </Grid>
            <Grid item xs={12} sm={3}>
                <label htmlFor='role'>Role</label>
              </Grid>
              <Grid item xs={12} sm={9}>
              <Select
                isMulti={true}
                isSearchable={true}
                options={allRole}
                onChange={handleSelectRole}
              />
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

export default CreateDepartment
