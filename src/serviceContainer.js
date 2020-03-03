import policyRepository from './repositories/policyRepository'
import logRepository from './repositories/logRepository'
import listRepository from './repositories/policyRepository'
import evaluationService from './services/evaluationService'
import accessorService from './services/accessorService'
import mappingService from './services/mappingService'
import lookupService from './services/lookupService'
import workflowService from './services/actionService'

function injected(container) {
    Object.values(container).forEach(bean => {
            let names = (bean.inject == 'all') ? Object.keys(beans) : bean.inject || []
            names.forEach(name => bean[name] = beans[name])
            console.log(JSON.stringify(bean))
        }
    )
    return container
}

const beans = {
    policyRepository,
    listRepository,
    evaluationService,
    accessorService,
    workflowService,
    logRepository,
    lookupService,
    mappingService
}

const serviceContainer = injected(beans)

export default serviceContainer
