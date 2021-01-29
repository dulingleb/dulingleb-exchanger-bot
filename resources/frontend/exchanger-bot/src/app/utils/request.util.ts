import {
  IRequestApiDto,
  IResponseApiInDto,
  IResponseApiOutDto,
  ITelegramUserInDto,
  ITelegramUserOutDto,
} from '@core/models'


export const apiQueryToParams = (apiQuery: IRequestApiDto, EFilterInToOutDto = {}): { [key: string]: string } => {
  const params: { [key: string]: string } = {}
  if (apiQuery.page) {
    params['page[number]'] = apiQuery.page + 1 + ''
  }
  if (apiQuery.pageSize) {
    params['page[size]'] = apiQuery.pageSize + ''
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

export const operationOutToInDto = (res: IResponseApiOutDto<any>): IResponseApiInDto<any> => ({
  currentPage: res.current_page - 1,
  page: res.from,
  lastPage: res.last_page,
  pageSize: res.per_page,
  to: res.to,
  total: res.total,
  data: res.data
})

export const telegramUserOutToInDto = (user: ITelegramUserOutDto): ITelegramUserInDto => {
  if (!user) { return null }
  return {
    id: user.id,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    exchangerId: user.exchanger_id,
    telegramUserId: user.telegram_user_id,
    operationsCount: user.operations_count,
    discount: +user.discount,
    comment: user.comment,
    ban: !!user.ban
  }
}
