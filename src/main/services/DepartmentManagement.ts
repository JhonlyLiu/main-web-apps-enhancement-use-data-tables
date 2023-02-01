import { ApiHandler } from "./ApiHandler"

const USER_MANAGEMENT_URI= process.env.NEXT_PUBLIC_API_URI_BASE + 'user-management/api'

/**
 * list department
 * 
 * This function handle request list department http request to User Management Service.
 * 
 * @returns 
 */
export async function listDepartment(){
    return ApiHandler.handleRequest(
        'GET',
        USER_MANAGEMENT_URI + "/v1/department/all"
    )
}

/**
 * list department pagination
 * 
 * This function handle request list department pagination http request to User Management Service.
 * 
 * @param page
 * @param search
 * @returns 
 */
export async function listDepartmentPagination(page: number, search: string){
    let finalUri = USER_MANAGEMENT_URI + "/v1/department/list?page="+page+"&per_page=10&search="+search
    return ApiHandler.handleRequest(
        'GET',
        finalUri
    )
}

/**
 * department detail
 * 
 * This function handle request department detail pagination http request to User Management Service.
 * 
 * @param id
 * @returns 
 */
export async function departmentDetail(id: any){
    return ApiHandler.handleRequest(
        'GET',
        USER_MANAGEMENT_URI + "/v1/department/detail/"+id
    )
}

/**
 * create department
 * 
 * This function handle request create department pagination http request to User Management Service.
 * 
 * @param name
 * @param code
 * @param role_id
 * @returns 
 */
export async function createDepartment(name: string, code: string, role_id: string[]){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/department/create",
        {
            "name": name,
            "code": code,
            "role_id": role_id
        }
    )
}

/**
 * update department
 * 
 * This function handle request update department pagination http request to User Management Service.
 * 
 * @param id
 * @param name
 * @param code
 * @param role_id
 * @returns 
 */
export async function updateDepartment(id: string, name: string, code: string, role_id: string[]){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/department/update",
        {
            "id": id,
            "name": name,
            "code": code,
            "role_id": role_id
        }
    )
}

/**
 * delete department
 * 
 * This function handle request delete department pagination http request to User Management Service.
 * 
 * @param id
 * @returns 
 */
export async function deleteDepartment(id: string){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/department/delete",
        {
            "id": id
        }
    )
}