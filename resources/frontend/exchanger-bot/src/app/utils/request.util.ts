import { IRequestApiDto } from '@core/models'

export const apiQueryToParams = (apiQuery: IRequestApiDto, EFilterInToOutDto = {}): { [key: string]: string } => {
  const params: { [key: string]: string } = {}
  if (apiQuery.page) {
    params['page[number]'] = apiQuery.page + ''
  }
  if (apiQuery.pageSize) {
    params.per_page = apiQuery.pageSize + ''
  }
  if (apiQuery.sort) {
    params.sort = apiQuery.order === 'desc' ? '-' : ''
    params.sort += apiQuery.order ? EFilterInToOutDto[apiQuery.sort] || apiQuery.sort : ''
  }
  for (const filterValue of apiQuery.filterValues) {
    params[`filter[${EFilterInToOutDto[filterValue.name] || filterValue.name}]`] = filterValue.value
  }
  return params
}
