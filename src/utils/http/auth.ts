import { getQueryString } from '@/utils/util'
import { getNcepAuth } from '@/api'

let _promise: null | Promise<boolean> = null

export function analysisRouterQuery() {
  const ncep_code = getQueryString('nges_auth_code') as string
  const hcp_code = getQueryString('hcp_cd') as string
  const scene_code = getQueryString('scene_code') as string
  return {
    ncep_code,
    hcp_code,
    scene_code
  }
}
export function setToken(token: string) {
  sessionStorage.setItem('X-Access-Token', token)
}

export function getToken() {
  return sessionStorage.getItem('X-Access-Token')
}

export function refreshToken() {
  if (_promise) {
    return _promise
  }

  // eslint-disable-next-line no-async-promise-executor
  _promise = new Promise(async (res) => {
    const { hcp_code, ncep_code, scene_code } = analysisRouterQuery()
    const resp = await getNcepAuth(
      hcp_code,
      {
        ncep_code,
        scene_code
      },
      {
        __isRefreshToken: true
      }
    )

    setToken(resp.token)
    res(!!resp.token)
  })

  _promise.finally(() => {
    _promise = null
  })

  return _promise
}

export function isRefreshRequest(config: any) {
  return !!config.__isRefreshToken
}

export function cleanToken() {
  sessionStorage.removeItem('X-Access-Token')
}
