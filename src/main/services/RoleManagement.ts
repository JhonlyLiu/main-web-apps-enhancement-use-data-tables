import { ApiHandler } from './ApiHandler'

const USER_MANAGEMENT_URI = process.env.NEXT_PUBLIC_API_URI_BASE + 'user-management/api'

/**
 * list role
 *
 * This function handle request list role http request to User Management Service.
 * 
 * @param page
 * @param search
 * @returns 
 */
export async function listRole(page: number, search: string){
    let finalUri = USER_MANAGEMENT_URI + "/v1/role/list?page="+page+"&per_page=1&search="+search
    return ApiHandler.handleRequest(
        'GET',
        finalUri
    )
}

/**
 * detail role
 *
 * This function handle request detail role http request to User Management Service.
 *
 * @returns
 */
export async function detailRole(roleId: string) {
  return ApiHandler.handleRequest('GET', USER_MANAGEMENT_URI + `/v1/role/detail/${roleId}`)
}

/**
 * create role
 *
 * This function handle request create role http request to User Management Service.
 *
 * @param name
 * @param code
 * @returns
 */
export async function createRole(name: string, code: string) {
  return ApiHandler.handleRequest('POST', USER_MANAGEMENT_URI + '/v1/role/create', {
    name: name,
    code: code
  })
}

/**
 * update role
 *
 * This function handle request update role http request to User Management Service.
 *
 * @param id
 * @param name
 * @param code
 * @param status
 * @returns
 */
export async function updateRole(id: string, name: string, code: string, status: boolean) {
  return ApiHandler.handleRequest('POST', USER_MANAGEMENT_URI + '/v1/role/edit', {
    id: id,
    name: name,
    code: code,
    status: status
  })
}

/**
 * delete role
 *
 * This function handle request delete role http request to User Management Service.
 *
 * @param id
 * @returns
 */
export async function deleteRole(id: string) {
  return ApiHandler.handleRequest('POST', USER_MANAGEMENT_URI + '/v1/role/delete', {
    id: id
  })
}
