export default interface ListUserPaginatedResponse {
	"current_page": number,
	"from": number,
	"to": number,
	"per_page": number,
	"total": string,
	"path": string,
	"first_page_uri": string,
	"last_page_uri": string,
	"next_page_uri": string,
	"prev_page_uri": null,
	"data": Array<{
		"id": string,
		"numa_tbl_user_roleame": string,
		"username": string,
		"employee_no": string,
		"role": string,
		"user_status": string
	}>
}