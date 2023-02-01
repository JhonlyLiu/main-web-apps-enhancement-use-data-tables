// ** React Imports
import { ChangeEvent, ReactNode, useState, MouseEvent } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// ** Layout Import
import BlankLayout from 'src/main/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/components/footer/FooterIllustration'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { changeForgottenPassword } from 'src/main/services/Authentication'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const ChangePassword = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })

  // ** Hook
  const router = useRouter()

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  async function handleSubmit(e:any){
    e.preventDefault()
    const changePass = async () => {
      const response = await changeForgottenPassword(Cookies.get('token') as string, values.password)
      Swal.fire({
        text:  response.status ? response.message : response.message,
        icon: response.status ? "success" : "error"
      })
      if(response.status){
        router.push({
          pathname: '/'
        })
      }
    }
    changePass()
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
              Reset Password
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'center' }}>
              Please enter your old password and new password
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'right' }}></Box>
            <Button
              fullWidth
              type='submit'
              size='large'
              variant='contained'
              sx={{ marginBottom: 7 }}
              onClick={() => router.push('/')}
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  )
}

ChangePassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ChangePassword
