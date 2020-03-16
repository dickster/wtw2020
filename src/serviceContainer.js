import policyRepository from './repositories/policyRepository'
import logRepository from './repositories/logRepository'
import listRepository from './repositories/policyRepository'
import evaluationService from './services/evaluationService'
import accessorService from './services/accessorService'
import mappingService from './services/mappingService'
import lookupService from './services/lookupService'
import workflowActionService from './services/workflowActionService'

function inject(container) {
    Object.values(container).forEach(bean => {
            let names = (bean.inject == 'all') ? Object.keys(container) : bean.inject || []
            names.forEach(name => bean[name] = container[name])
        }
    )
}

const serviceContainer = {
    policyRepository,
    listRepository,
    evaluationService,
    accessorService,
    workflowActionService,
    logRepository,
    lookupService,
    mappingService
}

inject(serviceContainer)

export default serviceContainer
