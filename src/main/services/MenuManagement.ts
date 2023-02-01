import { ApiHandler } from './ApiHandler'

const USER_MANAGEMENT_URI = process.env.NEXT_PUBLIC_API_URI_BASE + 'user-management/api'

export async function listAllMenu() {
  return ApiHandler.handleRequest("GET", USER_MANAGEMENT_URI + `all-Menu`)
}

/**
 * list menu
 *
 * This function handle request list menu http request to User Management Service.
 *
 * @returns
 */
export async function listMenu(page: number, search: string) {
  return ApiHandler.handleRequest('GET', USER_MANAGEMENT_URI + `/menu/list?page=${page}&per_page=10&search=${search}`)
}

/**
 * detail menu
 *
 * This function handle request detail menu http request to User Management Service.
 *
 * @returns
 */
export async function detailMenu(menuId: string) {
  return ApiHandler.handleRequest('GET', USER_MANAGEMENT_URI + `/v1/menu/detail/${menuId}`)
}

/**
 * create menu
 *
 * This function handle request create menu http request to User Management Service.
 *
 * @param name
 * @param parent_id
 * @param link
 * @param status
 * @param description
 * @param icon
 * @returns
 */
export async function createMenu(name: string, parent_id: string, link: string, description: string, icon: string) {
  return ApiHandler.handleRequest('POST', USER_MANAGEMENT_URI + '/menu/create', {
    name: name,
    parent_id: parent_id,
    link: link,
    description: description,
    icon: icon
  })
}

/**
 * update menu
 *
 * This function handle request update menu http request to User Management Service.
 *
 * @param id
 * @param name
 * @param parent_id
 * @param link
 * @param status
 * @param description
 * @param icon
 * @returns
 */
export async function updateMenu(
  id: string,
  name: string,
  parent_id: string,
  link: string,
  status: boolean,
  description: string,
  icon: string
) {
  return ApiHandler.handleRequest('POST', USER_MANAGEMENT_URI + '/v1/menu/update', {
    id: id,
    name: name,
    parent_id: parent_id,
    link: link,
    status: status,
    description: description,
    icon: icon
  })
}

/**
 * delete menu
 *
 * This function handle request delete menu http request to User Management Service.
 *
 * @param id
 * @returns
 */
export async function deleteMenu(id: string) {
  return ApiHandler.handleRequest('POST', USER_MANAGEMENT_URI + '/v1/menu/delete', {
    id: id
  })
}
