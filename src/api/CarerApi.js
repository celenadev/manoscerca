import request from 'axios'
/* eslint-disable constructor-super */
class CarerApi {
  constructor() {
    // super('carer')
  }
    // Método para paginar
    getAllCarers() {
      return request({
        url: `/api/carer/getAllCarers}`,
        method: 'get'
      })
    }
}
// export { UserApi as default }
export default new CarerApi()