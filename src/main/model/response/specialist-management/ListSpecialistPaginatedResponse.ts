export default interface ListSpecialistPaginatedResponse {
  "data": Array<{
    "current_page": 1,
    "from": 1,
    "to": 11,
    "per_page": 10,
    "total": 4,
    "path": "",
    "first_page_uri": "?page=1&per_page=10",
    "last_page_uri": "?page=1&per_page=10",
    "next_page_uri": null,
    "prev_page_uri": null,
    "data": Array<{
      "id": string,
      "name": string,
      "code": string,
      "created_at": string,
      "updated_at": string,
      "deleted_at": null
    }>
  }>
}