import InputLabel from "@mui/material/InputLabel"
import { useEffect, useState } from "react"
import { listOrganization } from "src/main/services/OrganizationalManagement"
import Select from 'react-select';
import Grid from '@mui/material/Grid'
import { listDepartment } from "src/main/services/DepartmentManagement";


interface FormStructureOrganizationComponentProps {
    handleSelectOrganization: any;
    handleSelectDepartment: any;
  }

/**
 * FormStructureOrganizationComponent
 * This function returns component for select organization and select departmeny dropdown
 *
 * @param props
 */
const FormStructureOrganizationComponent = (props: FormStructureOrganizationComponentProps) => {

    //----------------------------------------------------------------------
    // State Part
  
    const [allOrganization, setAllOrganization] = useState([])
    const [allDepartment, setAllDepartment] = useState([])
  
    //----------------------------------------------------------------------
    // Page Operations
  
    /**
     * getDepartments
     * handle get all department from API
     */
    const getDepartments = async () => {
      const response = await listDepartment()
      const result = response.data.map((element: any) => {
        return {
          label: element.name,
          value: element.id
        }
      })
      setAllDepartment(result)
    }
  
      /**
     * getOrganizations
     * handle get all organization from API
     */
    const getOrganizations = async () => {
      const response = await listOrganization()
      const result = response.data.map((element: any) => {
        return {
          label: element.name,
          value: element.id
        }
      })
      setAllOrganization(result)
    }
  
    //----------------------------------------------------------------------
    // Web Engine
    // Initialization Part
  
    useEffect(() => {
      getDepartments()
      getOrganizations()
    },[])
  
    // Page render
    return (
      <>
        <Grid item xs={12} sm={6}>
          <InputLabel>Organization</InputLabel>
          <Select
            isMulti={false}
            isSearchable={true}
            options={allOrganization}
            onChange={props.handleSelectOrganization}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel>Department</InputLabel>
          <Select
            isMulti={false}
            isSearchable={true}
            options={allDepartment}
            onChange={props.handleSelectDepartment}
          />
        </Grid>
      </>
    )
  }

  export default FormStructureOrganizationComponent