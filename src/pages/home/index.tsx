import { GlobalStyles, Typography } from '@mui/material'


const HomePage = () => {

  return (
    <div>
      <GlobalStyles styles={{ btn: { color: 'whitesmoke' } }} />
      <Typography variant='h4' sx={{ fontWeight: 600, marginBottom: 8 }}>
        Home Page
      </Typography>
    </div>
  )
}

export default HomePage
