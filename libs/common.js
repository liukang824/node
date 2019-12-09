const crypto = require('crypto')
module.exports = {
  MD5_SUFFIX : 'CJFJSBFN34T34HFFH984HFHF4399FOEIFHLKNVEGERGWKJFHHWKFFHKF',
  md5:str=>{
    let obj = crypto.createHash('md5')
    obj.update(str)
    return obj.digest('hex')
  }
}