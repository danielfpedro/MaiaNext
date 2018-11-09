const routes = require('next-routes')

module.exports = routes()
    .add('collaborators', '/profissionais', 'collaborators/index')
    .add('collaborators.add', '/profissionais/:flag(adicionar|editar)', 'collaborators/index')