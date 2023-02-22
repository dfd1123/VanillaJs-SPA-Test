

export default class CommonApiHandler {
    request(req){
        req.headers = {
            ...req.headers,
            'Content-Type': 'application/json',
            Pragma: 'no-cache',
            Expires: -1,
            Accept: 'application/json',
        };
        
        return req;
    }

    response(res, config) {
        return new Promise((resolve, reject) => {
            res
              .then(res => resolve(res.data))
              .catch((error) => {
                // alert(error);
                reject(error);
              });
          });
    }
}