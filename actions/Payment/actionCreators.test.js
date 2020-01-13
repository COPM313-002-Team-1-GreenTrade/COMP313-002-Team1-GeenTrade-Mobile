import * as actions from './actionCreators'
import * as types from './actionTypes'

describe('actions', () => {
  it('should create an action for purchaseTotal(price)', () => {
    //price $100
    const payload = 100
    const expectedAction = {
      type: types.PURCHASE_TOTAL,
      payload
    }
    expect(actions.purchaseTotal(payload)).toEqual(expectedAction)
  })
})