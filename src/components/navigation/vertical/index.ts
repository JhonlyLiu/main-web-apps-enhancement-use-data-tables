// ** Icon imports
import Login from 'mdi-material-ui/Login'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import LockCheckOutline from 'mdi-material-ui/LockCheckOutline'
import { ViewListOutline } from 'mdi-material-ui'

// ** Type import
import { VerticalNavItemsType } from 'src/main/@core/layouts/types'
import { Table } from 'mdi-material-ui'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Pages'
    },
    {
      title: 'Login',
      icon: Login,
      path: '/login',
      openInNewTab: true
    },
    {
      title: 'Change Password',
      icon: LockCheckOutline,
      path: '/changePass'
    },
    {
      title: 'List User',
      icon: Table,
      path: '/user-management/list-user'
    },
    {
      title: 'Role Management',
      icon: AccountCogOutline,
      path: '/role-management/list-role'
    },
    {
      title: 'Menu Management',
      icon: ViewListOutline,
      path: '/menu-management/list-menu'
    },
    {
      title: 'Organization Management',
      icon: HomeOutline,
      path: '/organization-management/list-organization'
    },
    {
      title: 'List Department',
      icon: Table,
      path: '/department-management/list-department'
    },
    {
      title: 'List Speciality',
      icon: Table,
      path: '/speciality-management/list-speciality'
    }
  ]
}

export default navigation
