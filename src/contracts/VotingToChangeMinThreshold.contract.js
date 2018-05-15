import Web3 from 'web3';
import { networkAddresses } from './addresses';
import helpers from "./helpers";

export default class VotingToChangeMinThreshold {
  constructor() {
    this.web3_10 = '';
    this.gasPrice = '';
  }

  async init({web3, netId}) {
    const {VOTING_TO_CHANGE_MIN_THRESHOLD_ADDRESS} = networkAddresses(netId);
    console.log('VotingToChangeMinThreshold address', VOTING_TO_CHANGE_MIN_THRESHOLD_ADDRESS);
    let web3_10 = new Web3(web3.currentProvider);
    this.web3_10 = web3_10;
    this.gasPrice = this.web3_10.utils.toWei('2', 'gwei');

    const branch = helpers.getBranch(netId);

    let votingToChangeMinThresholdABI = await helpers.getABI(branch, 'VotingToChangeMinThreshold')

    this.votingToChangeMinThresholdInstance = new web3_10.eth.Contract(votingToChangeMinThresholdABI, VOTING_TO_CHANGE_MIN_THRESHOLD_ADDRESS);
    this.gasPrice = web3_10.utils.toWei('1', 'gwei');
  }

  //setters
  createBallot({startTime, endTime, proposedValue, sender, memo}) {
    return this.votingToChangeMinThresholdInstance.methods.createBallot(startTime, endTime, proposedValue, memo).send({from: sender, gasPrice: this.gasPrice})
  }

  vote(_id, choice, sender) {
    return this.votingToChangeMinThresholdInstance.methods.vote(_id, choice).send({from: sender, gasPrice: this.gasPrice})
  }

  finalize(_id, sender) {
    return this.votingToChangeMinThresholdInstance.methods.finalize(_id).send({from: sender, gasPrice: this.gasPrice})
  }

  //getters
  getStartTime(_id) {
    return this.votingToChangeMinThresholdInstance.methods.getStartTime(_id).call();
  }

  getEndTime(_id) {
    return this.votingToChangeMinThresholdInstance.methods.getEndTime(_id).call();
  }

  votingState(_id) {
    if (this.votingToChangeMinThresholdInstance.methods.votingState) {
      return this.votingToChangeMinThresholdInstance.methods.votingState(_id).call();
    }
    return null;
  }

  getCreator(_id) {
    if (this.votingToChangeMinThresholdInstance.methods.getCreator) {
      return this.votingToChangeMinThresholdInstance.methods.getCreator(_id).call();
    }
    return null;
  }

  getTotalVoters(_id) {
    return this.votingToChangeMinThresholdInstance.methods.getTotalVoters(_id).call();
  }

  getProgress(_id) {
    return this.votingToChangeMinThresholdInstance.methods.getProgress(_id).call();
  }

  getIsFinalized(_id) {
    return this.votingToChangeMinThresholdInstance.methods.getIsFinalized(_id).call();
  }

  hasAlreadyVoted(_id, votingKey) {
    return this.votingToChangeMinThresholdInstance.methods.hasAlreadyVoted(_id, votingKey).call();
  }

  isValidVote(_id, votingKey) {
    return this.votingToChangeMinThresholdInstance.methods.isValidVote(_id, votingKey).call();
  }

  isActive(_id) {
    return this.votingToChangeMinThresholdInstance.methods.isActive(_id).call();
  }

  getProposedValue(_id) {
    return this.votingToChangeMinThresholdInstance.methods.getProposedValue(_id).call();
  }

  getMiningByVotingKey(_votingKey) {
    return this.votingToChangeMinThresholdInstance.methods.getMiningByVotingKey(_votingKey).call();
  }

  getMemo(_id) {
    return this.votingToChangeMinThresholdInstance.methods.getMemo(_id).call();
  }

  async getValidatorActiveBallots(_votingKey) {
    let miningKey;
    try {
      miningKey = await this.getMiningByVotingKey(_votingKey);
    } catch(e) {
      miningKey = "0x0000000000000000000000000000000000000000";
    }
    return await this.votingToChangeMinThresholdInstance.methods.validatorActiveBallots(miningKey).call();
  }

  async getBallotLimit(_votingKey) {
    const currentLimit = await this.votingToChangeMinThresholdInstance.methods.getBallotLimitPerValidator().call();
    return currentLimit - await this.getValidatorActiveBallots(_votingKey);
  }
}
