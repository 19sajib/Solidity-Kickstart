import web3 from './web3'
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x776ef138D8cdBc8aE1a902fA367526c7F44f129e"
)

export default instance;