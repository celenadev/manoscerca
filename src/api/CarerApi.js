import request from 'axios'
class CarerApi {
    // Método para paginar
    getCarers() {
      return request({
        url: `/api/carer/create}`,
        method: 'get'
      })
    }
}
// export { UserApi as default }
export default new CarerApi()