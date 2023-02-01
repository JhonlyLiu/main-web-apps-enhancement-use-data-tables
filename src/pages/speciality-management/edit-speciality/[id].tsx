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
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { detailSpecialist, updateSpecialist } from 'src/main/services/SpecialistManagement'
import Swal from 'sweetalert2'

const EditSpeciality = () => {
  const [specialityName, setSpecialityName] = useState("")
  const [specialityCode, setSpecialityCode] = useState("")
  
  const router = useRouter()
  
  let currentSpecilityId = window.location.pathname.split("/").pop()

  const fetchSpecialities = useCallback(async (): Promise<void> => {
    const response = await detailSpecialist(currentSpecilityId)
    setSpecialityName(response.data.name)
    setSpecialityCode(response.data.code)
  }, [])

  async function handleSubmit(e: any){
    e.preventDefault()
    const response = await updateSpecialist(currentSpecilityId, specialityName, specialityCode)
    await Swal.fire({
      text: response.message,
      icon: response.status ? "success" : "error"
    })
    if(response.status){
      router.push('/speciality-management/list-speciality')
    }
  }

  useEffect(() => {
    fetchSpecialities()
  },[fetchSpecialities])

  return (
    <Card>
      <CardHeader title='Edit Speciality' titleTypographyProps={{ textAlign: 'center'}}/>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item xs={12} sm={3}>
              <label htmlFor='specialityName'>Speciality Name</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='specialityName' value={specialityName} onChange={(e) => setSpecialityName(e.target.value)} sx={{padding: 0}} required/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='specialityCode'>Speciality Code</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='specialityCode' value={specialityCode} onChange={(e) => {setSpecialityCode(e.target.value)}} sx={{padding: 0}} required/>
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

export default EditSpeciality