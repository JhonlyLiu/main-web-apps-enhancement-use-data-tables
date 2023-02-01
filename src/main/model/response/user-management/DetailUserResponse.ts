export default interface DetailUserResponse {
  "data": Array<{
    "status_wording": string,
		"id": string,
		"fullname": string,
		"username": string,
		"email": string,
		"phone": string,
		"employee_no": string,
		"gender_id": string,
		"birth_date": string,
		"address": string,
		"speciality_id": null
  }>
}