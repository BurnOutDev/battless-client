import { fetchWrapper, history } from '../helpers'
import { HubConnectionBuilder } from '@aspnet/signalr'
import { accountService } from '.'
import { HubConnectionState } from '@aspnet/signalr'

//#region Connection

const config = require('../config.json')

const connection = new HubConnectionBuilder()
  .withUrl(`${config.apiUrl}/kline`, {
    accessTokenFactory: () => accountService.userValue.jwtToken
  })
  .build()

//#endregion

const baseUrl = `${config.apiUrl}/api/bet`

const placeBet = (amount, isRiseOrFall) => {
  if (gamblingService.connection.state === HubConnectionState.Connected)
    return gamblingService.connection
      .stop()
      .then(() => gamblingService.connection.start())
      .then(() => {
        return connection
          .invoke('RegisterConnection')
          .then(() =>
            fetchWrapper
              .post(`${baseUrl}`, { amount, isRiseOrFall })
              .catch((err) => console.error(err))
          )
      })
  else
    return gamblingService.connection.start().then(() => {
      return connection
        .invoke('RegisterConnection')
        .then(() =>
          fetchWrapper
            .post(`${baseUrl}`, { amount, isRiseOrFall })
            .catch((err) => console.error(err))
        )
    })
}

const getGame = () => {
  return fetchWrapper
    .get(`${baseUrl}/getgame`)
    .then(response => response)
    .catch((err) => console.error(err))
}

const getTableData = () => {
  return fetchWrapper
    .get(`${baseUrl}/getTableData`)
    .then(response => response)
    .catch((err) => console.error(err))
}

export const gamblingService = {
  placeBet,
  connection,
  getGame,
  getTableData
}
