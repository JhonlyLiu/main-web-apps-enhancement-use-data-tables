import { ApiHandler } from "./ApiHandler";

const USER_MANAGEMENT_URI= process.env.NEXT_PUBLIC_API_URI_BASE + 'user-management/api'

/**
 * login
 * 
 * This function handle login http request to User Management Service.
 * 
 * @param email
 * @param password
 * @returns 
 */
export async function login(username: string, password: string){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v2/login",
        {
            "username": username,
            "password": password
        }
    )
}

/**
 * change passsword
 * 
 * This function handle change password http request to User Management Service.
 * 
 * @param new_password
 * @returns 
 */
export async function changePassword(new_password: string){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/change-password",
        {
            "new_password": new_password
        }
    )
}

/**
 * change forgotten password
 * 
 * This function handle change forgotten password http request to User Management Service.
 * 
 * @param token
 * @param new_password
 * @returns 
 */
export async function changeForgottenPassword(token: string, new_password: string){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/change-forgotten-password",
        {
            "token": token,
            "new_password": new_password
        }
    )
}

/**
 * request forgot password
 * 
 * This function handle request forgot password http request to User Management Service.
 * 
 * @param email
 * @returns 
 */
export async function requestForgotPassword(email: string){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/request-forgot-password",
        {
            "email": email
        }
    )
}

/**
 * refresh token
 * 
 * This function handle request refresh token http request to User Management Service.
 * 
 * @returns 
 */
export async function refreshToken(){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/refresh-token"
    )
}

/**
 * me
 * 
 * This function handle request me http request to User Management Service.
 * 
 * @returns 
 */
export async function me(){
    return ApiHandler.handleRequest(
        'GET',
        USER_MANAGEMENT_URI + "/v1/me"
    )
}

/**
 * logout
 * 
 * This function handle request logout http request to User Management Service.
 * 
 * @returns 
 */
export async function logout(){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/logout"
    )
}

/**
 * select organization
 * 
 * This function handle request select organization http request to User Management Service.
 * 
 * @param organization_id
 * @returns 
 */
export async function selectOrganization(organization_id: string){
    return ApiHandler.handleRequest(
        'POST',
        USER_MANAGEMENT_URI + "/v1/save-session-organization",
        {
            "organization_id" : organization_id
        }
    )
}