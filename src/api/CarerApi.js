// import request from 'axios'
// class CarerApi {
//     // Método para guardar un nuevo usuario
//     addCarer() {
//       return request({
//         url: `/api/carers`,
//         method: 'post'
//       })
//     }
    
// }
// export { UserApi as default }
// export default new CarerApi()

import request from 'axios';

class CarerApi {
    // Método para guardar un nuevo usuario
    //El método addCarer está encapsulado dentro de una clase (CarerApi)
    // Los datos del nuevo carer se pasan como un argumento (newCarer) al método addCarer

    addCarer(newCarer) {
        return request({
            url: `/api/carers`,
            method: 'post',
            data: newCarer
        });
    }
}

export default new CarerApi();