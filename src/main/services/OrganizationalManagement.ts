import { ApiHandler } from './ApiHandler'

const USER_MANAGEMENT_URI = process.env.NEXT_PUBLIC_API_URI_BASE + 'user-management/api'

/**
 * list organization
 *
 * This function handle request list organization http request to User Management Service.
 *
 * @returns
 */
export async function listOrganization() {
  return ApiHandler.handleRequest('GET', USER_MANAGEMENT_URI + '/v1/organization/all')
}

/**
 * list organization pagination
 *
 * This function handle request list organization pagination http request to User Management Service.
 *
 * @returns
 */
export async function listOrganizationPagination(page: number, search: string) {
  return ApiHandler.handleRequest(
    'GET',
    USER_MANAGEMENT_URI + `/v1/organization/list?page=${page}&per_page=10&search=${search}`
  )
}

/**
 * organization detail
 *
 * This function handle request organization detail http request to User Management Service.
 *
 * @returns
 */
export async function organizationDetail(organizationId: string) {
  return ApiHandler.handleRequest('GET', USER_MANAGEMENT_URI + `/v1/organization/detail/${organizationId}`)
}

/**
 * create organization
 *
 * This function handle request create organization http request to User Management Service.
 *
 * @param name
 * @param code
 * @param address
 * @param status
 * @returns
 */
export async function createOrganization(name: string, code: string, address: string, status: boolean) {
  return ApiHandler.handleRequest('POST', USER_MANAGEMENT_URI + '/v1/organization/create', {
    name: name,
    code: code,
    address: address,
    status: status
  })
}

/**
 * update organization
 *
 * This function handle request update organization http request to User Management Service.
 *
 * @param id
 * @param name
 * @param code
 * @param address
 * @param status
 * @returns
 */
export async function updateOrganization(id: string, name: string, code: string, address: string, status: boolean) {
  return ApiHandler.handleRequest('POST', USER_MANAGEMENT_URI + '/v1/organization/update', {
    id: id,
    name: name,
    code: code,
    address: address,
    status: status
  })
}

/**
 * delete organization
 *
 * This function handle request delete organization http request to User Management Service.
 *
 * @param id
 * @returns
 */
export async function deleteOrganization(id: string) {
  return ApiHandler.handleRequest('POST', USER_MANAGEMENT_URI + '/v1/organization/delete', {
    id: id
  })
}
