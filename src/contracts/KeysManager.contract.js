import Web3 from 'web3'
import { networkAddresses } from './addresses'
import helpers from './helpers'
import { constants } from '../constants'

export default class KeysManager {
  async init({ web3, netId }) {
    const { KEYS_MANAGER_ADDRESS } = networkAddresses()
    console.log('KeysManager address', KEYS_MANAGER_ADDRESS)
    const web3_10 = new Web3(web3.currentProvider)

    const keysManagerABI = await helpers.getABI(constants.NETWORKS[netId].BRANCH, 'KeysManager')

    this.instance = new web3_10.eth.Contract(keysManagerABI, KEYS_MANAGER_ADDRESS)
    this.address = KEYS_MANAGER_ADDRESS
  }
}
