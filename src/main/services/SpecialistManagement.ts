import { ApiHandler } from "./ApiHandler"

const MASTER_DATA_URI= process.env.NEXT_PUBLIC_API_URI_BASE + 'master-data/api'

/**
 * list specialist
 * 
 * This function handle request list specialist http request to User Management Service.
 * 
 * @returns 
 */
export async function listSpecialist(){
    return ApiHandler.handleRequest(
        'GET',
        MASTER_DATA_URI + "/v1/specialist/all"
    )
}

/**
 * list specialist pagination
 * 
 * This function handle request list specialist http request to User Management Service.
 * 
 * @param page
 * @param search
 * @returns 
 */
export async function listSpecialistPagination(page: number, search: string){
    let finalUri = MASTER_DATA_URI + "/v1/specialist/list?page="+page+"&per_page=10&search="+search
    return ApiHandler.handleRequest(
        'GET',
        finalUri
    )
}

/**
 * detail specialist
 * 
 * This function handle request detail specialist http request to User Management Service.
 * 
 * @param specialist_id
 * @returns 
 */
export async function detailSpecialist(specialist_id:any){
    return ApiHandler.handleRequest(
        'GET',
        MASTER_DATA_URI + "/v1/specialist/detail/"+specialist_id
    )
}

/**
 * create specialist
 * 
 * This function handle request create specialist http request to User Management Service.
 * 
 * @param name
 * @param ncode
 * @returns 
 */
export async function createSpecialist(name: string, code: string){
    return ApiHandler.handleRequest(
        'POST',
        MASTER_DATA_URI + "/v1/specialist/create",
        {
            "name": name,
            "code": code
        }
    )
}

/**
 * update specialist
 * 
 * This function handle request update specialist http request to User Management Service.
 * 
 * @param id
 * @param name
 * @param ncode
 * @returns 
 */
export async function updateSpecialist(id: any, name: string, code: string){
    return ApiHandler.handleRequest(
        'POST',
        MASTER_DATA_URI + "/v1/specialist/update",
        {
            "id": id,
            "name": name,
            "code": code
        }
    )
}

/**
 * delete specialist
 * 
 * This function handle request delete specialist http request to User Management Service.
 * 
 * @param id
 * @returns 
 */
export async function deleteSpecialist(id: string){
    return ApiHandler.handleRequest(
        'POST',
        MASTER_DATA_URI + "/v1/specialist/delete",
        {
            "id": id
        }
    )
}