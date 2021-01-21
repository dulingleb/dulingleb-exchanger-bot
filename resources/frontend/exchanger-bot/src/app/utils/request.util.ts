import { IRequestApiDto } from '@core/models'

export const apiQueryToParams = (apiQuery: IRequestApiDto): { [key: string]: string } => {
  const params: { [key: string]: string } = {}
  if (apiQuery.page) {
    params['page[number]'] = apiQuery.page + ''
  }
  if (apiQuery.pageSize) {
    params.perPage = apiQuery.pageSize + ''
  }
  if (apiQuery.sort) {
    params.sort = apiQuery.sort
  }
  for (const filterValue of apiQuery.filterValues) {
    params[`filter[${filterValue.name}]`] = filterValue.value
  }
  return params
}
