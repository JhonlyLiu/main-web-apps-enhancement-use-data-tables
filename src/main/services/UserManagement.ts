import { ApiHandler } from "./ApiHandler";

const USER_MANAGEMENT_URI= process.env.NEXT_PUBLIC_API_URI_BASE + 'user-management/api'
const MASTER_DATA_URI= process.env.NEXT_PUBLIC_API_URI_BASE + 'master-data/api'

/**
 * list user
 * 
 * This function handle request list user http request to User Management Service.
 * 
 * @param page
 * @param search
 * @returns 
 */
export async function listUser(page: number, search: string){
    let finalUri = USER_MANAGEMENT_URI + "/v1/user/list?page="+page+"&per_page=10&search="+search
    return ApiHandler.handleRequest(
        'GET',
        finalUri
    )
}

/**
 * detail user
 * 
 * This function handle request detail user http request to User Management Service.
 * 
 * @param id
 * @returns 
 */
export async function detailUser(id: string){
    let finalUri = USER_MANAGEMENT_URI + "/v1/user/detail/"+id
    return ApiHandler.handleRequest(
        'GET',
        finalUri
    )
}

/**
 * create user
 * 
 * This function handle request create user http request to User Management Service.
 * 
 * @param fullname
 * @param username
 * @param email
 * @param password
 * @param phone
 * @param birth_date
 * @param gender
 * @param address
 * @param employee_no
 * @param specialist_id
 * @param administrative_structure
 * @returns 
 */
export async function createUser(fullname: string, username: string, email: string, password: string, phone: string, birth_date: string, gender: string, address: string, employee_no: string, specialist_id: string, administrative_structure: any ){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v2/user/create",
        {
            "fullname": fullname,
            "username": username,
            "email": email,
            "password": password,
            "phone": phone,
            "birth_date": birth_date,
            "gender": gender,
            "address": address,
            "employee_no": employee_no,
            "specialist_id": specialist_id,
            "administrative_structure": [
                {
                    "organization_id": administrative_structure.organization_id,
                    "department_id": administrative_structure.department_id
                }
            ]
        }
    )
}

/**
 * update user
 * 
 * This function handle request update user http request to User Management Service.
 * 
 * @param id
 * @param fullname
 * @param username
 * @param email
 * @param password
 * @param phone
 * @param birth_date
 * @param gender
 * @param address
 * @param employee_no
 * @param specialist_id
 * @param status
 * @param administrative_structure
 * @returns 
 */
export async function updateUser(id: string, fullname: string, username: string, email: string, password: string, phone: string, birth_date: string, gender: string, address: string, employee_no: string, specialist_id: string, status: number, administrative_structure: any){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v2/user/update",
        {
            "id": id,
            "fullname": fullname,
            "username": username,
            "email": email,
            "password": password,
            "phone": phone,
            "birth_date": birth_date,
            "gender": gender,
            "address": address,
            "employee_no": employee_no,
            "specialist_id": specialist_id,
            "status": status,
            "administrative_structure": [
                {
                    "organization_id": administrative_structure.organization_id,
                    "department_id": administrative_structure.department_id
                }
            ]
        }
    )
}

/**
 * delete user
 * 
 * This function handle request delete user http request to User Management Service.
 * 
 * @param id
 * @returns 
 */
export async function deleteUser(id: string){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/user/delete",
        {
            "id": id
        }
    )
}

/**
 * suspend user
 * 
 * This function handle request suspend user http request to User Management Service.
 * 
 * @param id
 * @returns 
 */
export async function suspendUser(id: string){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/user/suspend",
        {
            "id": id
        }
    )
}

/**
 * get all gender
 * 
 * This function handle request get all gender user http request to User Management Service.
 * 
 * @param page
 * @param search
 * @returns 
 */
export async function getAllGender(page: number, search: string){
    let finalUri = MASTER_DATA_URI + "/v1/gender/list?page="+page+"&per_page=10&search="+search
    return ApiHandler.handleRequest(
        'GET',
        finalUri
    )
}