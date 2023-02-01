// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useContext, useState } from 'react'

// ** Next Imports
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Layout Import
import BlankLayout from 'src/main/@core/layouts/BlankLayout'

// ** Service Import
import { login } from 'src/main/services/Authentication'

// ** Demo Imports
import FooterIllustrationsV1 from 'src/components/footer/FooterIllustration'

// ** Other Import
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const LoginPage = () => {
  // ** State
  // State for save password and make password visible or not
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })

  // State for save username from input
  const [username, setUsername] = useState("")

  // ** Hook
  const router = useRouter()

  /**
   * handleChange
   * handle password change from input
   * 
   * @param prop 
   * @returns 
   */
  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  /**
   * handleClickShowPassword
   * handle show password when icon butten clicked
   */
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  /**
   * handleMouseDownPassword
   * @param event
   */
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  /**
   * handleSubmit
   * handle submit and call login API
   * @param e 
   */
  async function handleSubmit(e:any) {
    e.preventDefault()
    const response = await login(username, values.password)

    await Swal.fire({
      text:  response.status ? response.message : response.message,
      icon: response.status ? "success" : "error"
    })
    if(response.status){
      Cookies.set('token', response.data.token)
      await router.push({
        pathname: '/select-organization',
        query: {listOrg: JSON.stringify(response.data.list_organization_id)}
      }, '/select-organization')
    }
  }

  // Render Page
  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img width={230} src={`/images/logos/SiloamHospitals.png`} alt='SiloamLogo.png' />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5, textAlign: 'center' }}>
              Welcome back!
            </Typography>
            <Typography variant='body2' sx={{ textAlign: 'center' }}>
              Please login to your account
            </Typography>
          </Box>
          <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} onChange={(e) => {setUsername(e.target.value)}}/>
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
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'right' }}>
              <Link passHref href='/forgot-pass'>
                <LinkStyled>Forgot Password?</LinkStyled>
              </Link>
            </Box>
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

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
