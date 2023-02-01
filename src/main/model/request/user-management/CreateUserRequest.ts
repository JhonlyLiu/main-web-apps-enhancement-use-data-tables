export default interface CreateUserRequest{
    "fullname": string,
    "username": string,
    "email": string,
    "password": string,
    "phone": string,
    "birth_date": string,
    "gender": string,
    "address": string,
    "employee_no": string, 
    "specialist_id": null,
	"administrative_structure": Array<{
        "organization_id": "b3ccffd6-8c03-4132-9e87-a78da5d79cdb",
		"department_id": "183de8d6-17fd-4021-8096-42cc7a930d10"
    }>
}