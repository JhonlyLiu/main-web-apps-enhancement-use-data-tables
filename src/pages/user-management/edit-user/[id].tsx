// ** React Imports
import { ChangeEvent, MouseEvent, useState, forwardRef, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { EyeOffOutline, EyeOutline } from 'mdi-material-ui'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { listDepartment } from 'src/main/services/DepartmentManagement'
import { listOrganization } from 'src/main/services/OrganizationalManagement'
import InputLabel from '@mui/material/InputLabel'
import Select from 'react-select';
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { detailUser, getAllGender, updateUser } from 'src/main/services/UserManagement'
import { listSpecialist } from 'src/main/services/SpecialistManagement'
import FormStructureOrganizationComponent from 'src/components/FormStructureOrganizationComponent'

// Custom Input
const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} autoComplete='off' />
})

interface State {
  password: string
  showPassword: boolean
}

interface FormStructureOrganizationComponentProps {
  handleSelectOrganization: any;
  handleSelectDepartment: any;
}

const EditUser = () => {
  //----------------------------------------------------------------------
  // State Part
  const [allGender, setAllGender] = useState([])
  const [gender, setGender] = useState("")
  const [specialist, setSpecialist] = useState("")
  const [allSpecialist, setAllSpecialist] = useState([])
  const [birthDate, setBirthDate] = useState<Date>(new Date())

  const [tempDepartment, setTempDepartment] = useState("")
  const [tempOrganization, setTempOrganization] = useState("")

  const [countAdminStructure, setcountAdminStructure] = useState(0)
  const [loopArray, setLoopArray] = useState<Array<number>>([])

  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [emplNumb, setEmplNumb] = useState("")
  const [administrativeStructure, setAdministrativeStructure] = useState<any>([])
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })
  const [status, setStatus] = useState(1)

  // ** Hook
  const router = useRouter()

  //----------------------------------------------------------------------
  // Page Operations

  /**
   * handleMouseDownPassword
   * @param event
   */
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

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
   * handle select gender
   * @param e 
   */
  const handleSelectGender = async (e: any) => {
    setGender(e.value)
  }

  /**
   * handle choose status
   * @param e 
   */
  const handleChooseStatus = async (e: any) => {
    setStatus(e.target.value)
  }

    /**
   * handle select specialist
   * @param e 
   */
  const handleSelectSpecialist = async (e: any) => {
    setSpecialist(e.value)
  }

    /**
   * handle select department
   * @param e 
   */
  const handleSelectDepartment = async (e: any) => {
    setTempDepartment(e.value)
  }

    /**
   * handle select organization
   * @param e 
   */
  const handleSelectOrganization = async (e: any) => {
    setTempOrganization(e.value)
  }

   /**
   * handleAddAdministrativeStructure
   *
   * This function contains the handle event
   * on click add administrative structure button.
   *
   * The algorithm that applies on this function are broken down on
   * this list below:
   *
   * 1. Check if either tempOrganization or tempDepartment are empty string
   *    -> Case true
   *        1. Throw sweetalert "Please input the administrative structure
   *    -> Case false
   *        1. Make new administrative structure object
   *        2. Array push the created object in number 1 into Administrative Structure array
   *        3. Add one length for Administrative Structure Row
   * 2. If the autoAddRow is set to false, then proceed to create a new row after creation process is done.
   */
   const handleAddAdministrativeStructure = (autoAddRow = true) => {

    if (tempOrganization == "" || tempDepartment == ""){
      Swal.fire({
        text: "Please input the administrative structure",
        icon: 'error'
      })
    }else{
      // Make Administrative Structure object
      const data = makeAdministrativeStructure(tempOrganization, tempDepartment)

      // Array push the current data to Administrative Structure state.
      setAdministrativeStructure((currentList: any) => [...currentList, data])

      console.log(data)
      // Add new Administrative Structure Row

      if(autoAddRow){
        const arrayLength = countAdminStructure + 1
        for (let i = 0; i < arrayLength; i++){
          setLoopArray(loopArray.concat(i))
        }

        setcountAdminStructure(arrayLength)
      }
    }
  }

  /**
   * getGenders
   * handle get all gender from API
   */
  const getGenders = async () => {
    const response = await getAllGender(1, "")
    const result = response.data.data.map((element: any) => {
      return {
        label: element.name,
        value: element.id
      }
    })
    setAllGender(result)
  }

    /**
   * getSpecialities
   * handle get all speciality from API
   */
  const getSpecialities = async () => {
    const response = await listSpecialist()
    const result = response.data.map((element: any) => {
      return {
        label: element.name,
        value: element.id
      }
    })
    setAllSpecialist(result)
  }

  /**
   * makeAdministrativeStructure
   * handle make administrative structure object
   * 
   * @param orgId 
   * @param deptId 
   * @returns 
   */
  const makeAdministrativeStructure = (orgId: string, deptId: string) => {
    return {
      organization_id: orgId,
      department_id: deptId
    }
  }

  async function handleSubmit(e:any): Promise<void>{
    e.preventDefault()
    let currentUserId = window.location.pathname.split("/").pop() as string
    const month = birthDate.getMonth() + 1;
    const day = birthDate?.getDate()
    let dateOfBirth =""
    if (month.toString().length == 1){
      const formatMonth = `0${month}`
      if(day?.toString().length == 1){
        const formatDay = `0${day}`
        dateOfBirth = `${birthDate?.getFullYear()}-${formatMonth}-${formatDay}`
      } else {
        dateOfBirth = `${birthDate?.getFullYear()}-${formatMonth}-${day}`
      }
    } else {
      dateOfBirth = `${birthDate?.getFullYear()}-${month}-${birthDate?.getDate()}`
    }

    handleAddAdministrativeStructure(false);
    const response = await updateUser(currentUserId, fullname, username, email, values.password, phone, dateOfBirth, gender, address, emplNumb, specialist, status, administrativeStructure)
    console.log(response)
    await Swal.fire({
      text: response.message,
      icon: response.status ? 'success' : 'error'
    })
    if(!response.status){
      router.push('/user-management/list-user')
    }
  }

  const fetchUser = useCallback(async (): Promise<void> => {
    let currentUserId = window.location.pathname.split("/").pop() as string
    const response = await detailUser(currentUserId)
    setFullname(response.data.fullname)
    setUsername(response.data.username)
    setEmail(response.data.email)
    setValues({ ...values, password: response.data.password })
    setPhone(response.data.phone)
    setGender(response.data.gender)
    setAddress(response.data.address)
    setEmplNumb(response.data.emplNumb)
    setTempOrganization(response.data.administrative_structure.organization_id)
    setTempDepartment(response.data.administrative_structure.organization_id)
    setSpecialist(response.data.specility)
    setStatus(response.data.speciality)
  }, [])

  //----------------------------------------------------------------------
  // Web Engine
  // Initialization Part

  useEffect(() => {
    fetchUser()
    getGenders()
    getSpecialities()
  },[fetchUser])

  // Page render
  return (
    <Card>
      <CardHeader title='Create User' titleTypographyProps={{ textAlign: 'center'}}/>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={5} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item xs={12} sm={3}>
              <label htmlFor='fullname'>Fullname</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='fullname' sx={{padding: 0}} required onChange={(e) => {setFullname(e.target.value)}}/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='username'>Username</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='username' sx={{padding: 0}} required onChange={(e) => {setUsername(e.target.value)}}/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='email'>Email</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='email' type='email' sx={{padding: 0}} required onChange={(e) => {setEmail(e.target.value)}}/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='email'>Password</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <OutlinedInput
                fullWidth
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
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='phone'>Phone</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField fullWidth id='phone' sx={{padding: 0}} required onChange={(e) => {setPhone(e.target.value)}}/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='birthdate'>Birth Date</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <DatePicker
                selected={birthDate}
                dateFormat="yyyy/MM/dd"
                showYearDropdown
                showMonthDropdown
                placeholderText='YYY-MM-DD'
                customInput={<CustomInput />}
                id='birthdate'
                onChange={(date: Date) => setBirthDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <label htmlFor='gender'>Gender</label>
            </Grid>
            <Grid item xs={12} sm={9}>
              <Select
                isMulti={false}
                isSearchable={true}
                options={allGender}
                onChange={handleSelectGender}
              />
              </Grid>
              <Grid item xs={12} sm={3}>
                <label htmlFor='address'>Address</label>
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField fullWidth multiline minRows={3} id='address' sx={{padding: 0}} required onChange={(e) => setAddress(e.target.value)}/>
              </Grid>
              <Grid item xs={12} sm={3}>
                <label htmlFor='employee-numb'>Employee No</label>
              </Grid>
              <Grid item xs={12} sm={9}>
                <TextField fullWidth type='number' id='employee-numb' sx={{padding: 0}} required onChange={(e) => setEmplNumb(e.target.value)}/>
              </Grid>
              <Grid item xs={12} sm={3}>
                <label htmlFor='employee-numb'>Administrative Structure</label>
              </Grid>
              <Grid item xs={12} sm={9}>
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
                    <Button variant='contained' onClick={() => handleAddAdministrativeStructure()} color='primary' sx={{margin: '5px'}}>+ Add Administrative Structure</Button>
                  </Box>
                </Box>
              </Grid>
              <FormStructureOrganizationComponent handleSelectOrganization={handleSelectOrganization} handleSelectDepartment={handleSelectDepartment}/>
              {
                loopArray.map((element: any) => {
                  return(
                    <FormStructureOrganizationComponent key={element} handleSelectOrganization={handleSelectOrganization} handleSelectDepartment={handleSelectDepartment}/>
                  )
                })
              }
              <Grid item xs={12} sm={3}>
                <label htmlFor='speciality'>Speciality</label>
              </Grid>
              <Grid item xs={12} sm={9}>
              <Select
                isMulti={false}
                isSearchable={true}
                options={allSpecialist}
                onChange={handleSelectSpecialist}
              />
              </Grid>
              <Grid item xs={12} sm={3}>
                <label htmlFor='status'>Status</label>
              </Grid>
              <Grid item xs={12} sm={9}>
                <RadioGroup
                  row
                  defaultValue={status}
                  onChange={handleChooseStatus}
                >
                  <FormControlLabel value={1} control={<Radio />} label="Active" />
                  <FormControlLabel value={0} control={<Radio />} label="Inactive" />
                </RadioGroup>
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

export default EditUser