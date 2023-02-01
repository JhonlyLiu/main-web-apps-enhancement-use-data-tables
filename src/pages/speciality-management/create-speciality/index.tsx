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
import { useState } from 'react'
import router from 'next/router'
import Swal from 'sweetalert2'
import { createSpecialist } from 'src/main/services/SpecialistManagement'

const CreateSpeciality = () => {
  const [specialityName, setSpecialityName] = useState("")
  const [specialityCode, setSpecialityCode] = useState("")

  async function handleSubmit(e: any){
    e.preventDefault()
    const addDepartment = async () => {
      const response = await createSpecialist(specialityName, specialityCode)
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

  return (
    <Card>
      <CardHeader title='Create Speciality' titleTypographyProps={{ textAlign: 'center'}}/>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item xs={12} sm={3}>
              <label htmlFor='specialityName'>Speciality Name</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='specialityName' onChange={(e) => {setSpecialityName(e.target.value)}} sx={{padding: 0}} required/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='specialityCode'>Speciality Code</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='specialityCode' onChange={(e) => {setSpecialityCode(e.target.value)}} sx={{padding: 0}} required/>
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

export default CreateSpeciality