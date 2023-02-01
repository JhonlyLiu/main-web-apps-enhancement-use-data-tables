// ** React Imports
import { ReactNode, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

// ** Layout Import
import BlankLayout from 'src/main/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/components/footer/FooterIllustration'
import { requestForgotPassword } from 'src/main/services/Authentication'
import Swal from 'sweetalert2'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ForgotPass = () => {
  // ** States
  const [email, setEmail] = useState("")

  // ** Hook
  const router = useRouter()

  async function handleSubmit(e:any){
    e.preventDefault()
    const requestForgotPass = async () => {
      const response = await requestForgotPassword(email)
      Swal.fire({
        text:  response.status ? response.message : response.message,
        icon: response.status ? "success" : "error"
      })
      if(response.status){
        router.push({
          pathname: '/',
        })
      }
    }
    requestForgotPass()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img width={230} src={`/images/logos/SiloamHospitals.png`} alt='SiloamLogo.png' />
          </Box>
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant='body2' sx={{ textAlign: 'center' }}>
              Enter the email address associated with your account and we'll send you a link to reset your password
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField autoFocus fullWidth id='email' label='Email' onChange={(e) => {setEmail(e.target.value)}} sx={{ marginBottom: 4 }} />
            <Button
              fullWidth
              type='submit'
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={() => router.push('/')}
            >
              Request Forgot Password Link
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ForgotPass.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPass
