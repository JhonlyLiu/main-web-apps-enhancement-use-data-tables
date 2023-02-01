// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useEffect, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Layout Import
import BlankLayout from 'src/main/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/components/footer/FooterIllustration'

// ** Service Import
import { selectOrganization } from 'src/main/services/Authentication'

// ** Other Import
import Select from 'react-select';
import Swal from 'sweetalert2'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const SelectOrganizationPage = () => {
  // ** State

  // ** state to save selected organization
  const [Organization, setOrganization] = useState("")

  // ** state to saved select organization dropdown
  const [allOrganization, setAllOrganization] = useState<any>([])

  // ** Hook
  const router = useRouter()

  // ** get data from query param
  const data = JSON.parse(router.query.listOrg as string)

  /**
   * handleOrganizationChange
   * handle set selected organization
   * 
   * @param e 
   */
  const handleOrganizationChange = async (e: any) => {
    setOrganization(e.value)
  }

  /**
   * makeOrganizationOptions
   * handle make organization options for select organization dropdown from data  
   * 
   * @param data 
   * @returns 
   */
  const makeOrganizationOptions = (data: any) => {
    const result = data.map((element: any) => {
      return {
        label: element.organization_name,
        value: element.organization_id
      }
    })
    setAllOrganization(result)
  }
  
  /**
   * handleSubmit
   * handle submit and hit the select organizations API
   * @param e 
   */
  async function handleSubmit(e:any) {
    e.preventDefault()
    const response = await selectOrganization(Organization)
      Swal.fire({
        text:  response.status ? response.message : response.message,
        icon: response.status ? "success" : "error"
      })
      if(response.status){
        router.push({
          pathname: '/home'
        })
      }
  }

  // -----------------------------------------------------------------------------------------------------------
  // Web Engine
  // Initilization Part

  useEffect(() => {
    makeOrganizationOptions(data)
  },[])

  // page render
  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img width={230} src={`/images/logos/SiloamHospitals.png`} alt='SiloamLogo.png' />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
              Select Organization
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'center' }}>
              Please select organization
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Grid item xs={12} sm={9} sx={{paddingY: "20px"}}>
              <Select
                isMulti={false}
                options={allOrganization}
                onChange={handleOrganizationChange}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    <FooterIllustrationsV1 />
  </Box>
  )
}

SelectOrganizationPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default SelectOrganizationPage