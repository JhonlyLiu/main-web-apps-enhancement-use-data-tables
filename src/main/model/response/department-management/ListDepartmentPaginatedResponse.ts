export default interface ListDepartmentPaginatedResponse {
  "data": Array<{
    "current_page": number,
		"from": number,
		"to": number,
		"per_page": number,
		"total": number,
		"path": string,
		"first_page_uri": string,
		"last_page_uri": string,
		"next_page_uri": null,
		"prev_page_uri": null,
		"data": Array<{
      "id": string,
      "name": string,
      "code": string
    }>
  }>
}