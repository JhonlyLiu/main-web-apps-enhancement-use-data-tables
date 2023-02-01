export default interface LoginResponse{
  "data": Array<{
    "user_id": string,
    "token": string,
    "email": string,
    "list_organization_id": Array<{
        "organization_id": string,
        "organization_name": string
    }>
  }>
}