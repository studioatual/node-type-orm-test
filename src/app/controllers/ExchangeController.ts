const fs = require('fs')
const path = require('path')
import api from '../../services/api'
import DateFormat from '../../utils/DateFormat';
import Exchange from '../models/exchange';

class ExchangeController {
  async index() {
    try {
      const exchanges = await Exchange.all()
      
      const response = await api.post('exchanges', { exchanges })
      const { result: { errors } } = response.data
                                 
      if (errors.length) {
        let folder = path.resolve(__dirname, '..', '..', '..', 'errors', `${DateFormat.format(new Date(), 'yyyy')}`, `${DateFormat.format(new Date(), 'MM')}`, `${DateFormat.format(new Date(), 'dd')}`);
        fs.mkdirSync(folder, { recursive: true })
        fs.writeFileSync(path.resolve(folder, `exchanges__${DateFormat.format(new Date(), 'yyyy_MM_dd_HH_ii_ss')}.json`), JSON.stringify(errors))
      }
      
    } catch(err) {
      console.error(err.response.data)
    }
  }
}

export default new ExchangeController