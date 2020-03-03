export default {

    async error({state, dispatch, commit, rootState}, msg) {
        return this.log(state, commit, { level: 'error', msg:msg})
    },

    async warning({state, dispatch, commit, rootState}, msg) {
        return this.log(state, commit, { level: 'warning', msg:msg})
    },

    async info({state, dispatch, commit, rootState}, msg) {
        return this.log( state, commit, { level: 'info', msg:msg})
    },

    async debug({state, dispatch, commit, rootState}, msg) {
        return this.log(state, commit, { level: 'debug', msg:msg})
    },

    async log({state, dispatch, commit, rootState}, entry) {
        // I just store events occurring in this session in VUEX.
        // to see *all* events, you need to read from the DB.

        // TODO : add time, user, currentState, etc... to log entry
        entry.date = new Date()
        entry.user = rootState.context.user

        state.events.push(entry)

        return this.$serviceContainer.logRepository.add(entry)
    },

    // async purge({state, commit, rootState}) {
    //   purge all entries over say, 30 days old.
    // }

}
