import 'babel-polyfill'
import React from 'react'
import { ButtonLoadMore } from '../ButtonLoadMore'
import { inject, observer } from 'mobx-react'
import { observable } from 'mobx'
import { getNetworkBranch } from '../../utils/utils'

@inject('commonStore', 'ballotsStore', 'ballotStore', 'contractsStore')
@observer
export class Ballots extends React.Component {
  @observable limit

  constructor(props) {
    super(props)
    this.limit = this.props.commonStore.loadMoreLimit
    this.step = this.limit
    this.onClick = this.onClick.bind(this)
  }

  onClick = async () => {
    const { commonStore } = this.props
    this.limit += this.step
    commonStore.loadMoreLimit = this.limit
  }

  filterBySearchTerm = (searchTerm, ballotCards) => {
    const { ballotStore } = this.props
    searchTerm = searchTerm.toLowerCase()
    for (let i = 0; i < ballotCards.length; i++) {
      const votingState = ballotCards[i].props.votingState
      const contractType = ballotCards[i].props.type

      if (
        String(votingState.creator)
          .toLowerCase()
          .includes(searchTerm)
      ) {
        continue
      }
      if (
        String(votingState.creatorMiningKey)
          .toLowerCase()
          .includes(searchTerm)
      ) {
        continue
      }
      if (
        String(votingState.memo)
          .toLowerCase()
          .includes(searchTerm)
      ) {
        continue
      }

      if (contractType === ballotStore.BallotType.keys) {
        if (
          String(votingState.miningKey)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
        if (
          String(votingState.affectedKey)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
        if (
          String(votingState.newVotingKey)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
        if (
          String(votingState.newPayoutKey)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
        if (
          String(votingState.affectedKeyTypeDisplayName)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
        if (
          String(votingState.ballotTypeDisplayName)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
      } else if (contractType === ballotStore.BallotType.minThreshold) {
        if (
          String(votingState.proposedValue)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
      } else if (contractType === ballotStore.BallotType.proxy) {
        if (
          String(votingState.proposedValue)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
        if (
          String(votingState.contractTypeDisplayName)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
      } else if (contractType === ballotStore.BallotType.emissionFunds) {
        if (
          String(votingState.receiver)
            .toLowerCase()
            .includes(searchTerm)
        ) {
          continue
        }
      }

      ballotCards.splice(i--, 1)
    }
    return ballotCards
  }

  componentWillMount() {
    const { commonStore } = this.props
    commonStore.isActiveFilter = this.props.isActiveFilter
    commonStore.isToFinalizeFilter = this.props.isToFinalizeFilter
  }

  getVotingNetworkBranch = () => {
    const { contractsStore } = this.props

    return contractsStore.netId ? getNetworkBranch(contractsStore.netId) : null
  }

  render() {
    const { ballotsStore, commonStore } = this.props

    let ballotCards = ballotsStore.ballotCards.toJS().sort((a, b) => {
      return b.props.votingState.startTime - a.props.votingState.startTime
    })

    if (commonStore.searchTerm) {
      ballotCards = this.filterBySearchTerm(commonStore.searchTerm, ballotCards)
    }

    let loadMore = null

    if (ballotCards.length > this.limit && !commonStore.isActiveFilter && !commonStore.isToFinalizeFilter) {
      loadMore = (
        <div className="sw-LoadMore">
          <ButtonLoadMore networkBranch={this.getVotingNetworkBranch()} onClick={e => this.onClick(e)} />
        </div>
      )

      ballotCards.splice(this.limit)
    }

    return (
      <section className="sw-Ballots">
        {ballotCards}
        {loadMore}
      </section>
    )
  }
}
