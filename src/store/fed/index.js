import properties from '../../data/properties'

const state = {
  properties: properties
}

const getters = {
  properties(state){
    return state.properties
  }
}

const mutations = {
  fetchProperties (state, properties) {
    state.properties = properties;
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}