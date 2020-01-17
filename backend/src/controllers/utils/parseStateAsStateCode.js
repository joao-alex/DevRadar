const states = new Map();

states.set('São Paulo','SP')
states.set('Rio de Janeiro','RJ')
states.set('Paraná','PR')
states.set('Santa Catarina','SC')
states.set('Rio Grande do Sul"','RS')
states.set('Minas Gerais','MG')
states.set('Espirito Santo','ES')
states.set('Mato Grosso do Sul','MS')
states.set('Goiás','GO')
states.set('Distrito Federal','DF')
states.set('Mato Grosso','MT')
states.set('Tocantins','TO')
states.set('Bahia','BA')
states.set('Sergipe','SE')
states.set('Alogoas','AL')
states.set('Pernambuco','PE')
states.set('Paraíba','PB')
states.set('Rio Grande do Norte','RN')
states.set('Ceará','CE')
states.set('Maranhão','MA')
states.set('Piauí','PI')
states.set('Amazonas','AM')
states.set('Acre','AC')
states.set('Amapá','AP')
states.set('Rondônia','RO')
states.set('Roraima','RR')
states.set('Pará','PA')

module.exports = function parseStateAsStateCode(state){
    return states.get(state);
}