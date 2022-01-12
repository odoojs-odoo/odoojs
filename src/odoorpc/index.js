import { Environment } from './env'

import { JsonRequest } from './request'

import controllers from './controllers'

const init = ({ baseURL, timeout }) => {
  JsonRequest.baseURL = baseURL
  JsonRequest.timeout = timeout
}

/*
  init,
  Environment,
  web,
  rerport,
  web_editor
*/

export default {
  init,
  Environment,
  ...controllers
}
