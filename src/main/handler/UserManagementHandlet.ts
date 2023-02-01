import { listUser } from 'src/main/services/UserManagement';
import DefaultPaginatedRequest from "../model/request/DefaultPaginatedRequest";

export async function fetchAllUser(request: DefaultPaginatedRequest){
  let loading = true;
  const response = await listUser(request.page, request.search)
  if(response.status){
    const AllUser = response.data.data
    const CurrentPage = response.data.current_page
    const TotalRow = response.data.total
    loading = false
    return {AllUser, CurrentPage, TotalRow}
  }
}