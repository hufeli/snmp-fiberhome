require('./src/prototype-functions')
const gFunc = require('./src/global-functions')
const olt = require('./src/olt')
const slot = require('./src/slot')
const card = require('./src/card')
const onu = require('./src/onu')

module.exports = {
    version: { SNMPv1: 0, SNMPv2c: 1, SNMPv3: 3 },

    // OLT
    ...olt,

    // SLOT
    ...slot,

    // CARD
    ...card,

    // ONU
    ...onu,

    // Global Functions
    timeNow: gFunc.timeNow,
    diffTime: gFunc.diffTime,
    isValid: gFunc.isValid,
}
