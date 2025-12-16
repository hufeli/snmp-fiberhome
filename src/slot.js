const snmp = require('net-snmp')
const tables = require('./tables')
const oid_fh = require('./oid-fh')
const snmp_fh = require('./pack-fiberhome')
const card = require('./card')

const OID = oid_fh.OIDs

async function getSlots(options) {
    const aSlots = []
    try {
        const varbinds = await snmp_fh.subtree(options, OID.getSlot)
        varbinds.forEach(onu => {
            aSlots.push(onu.value)
        })
        return aSlots
    } catch (error) {
        console.error('Error: Unable to connect to OLT')
        return false
    }
}

async function getSlotsInformationList(options) {
    try {
        const aONUs = []
        const varbinds = await snmp_fh.subtree(options, OID.getSlotsInformationList)
        varbinds.forEach((e, idx) => {
            if (e.oid.split('.')[13] == 2) {
                aONUs.push({ slot: parseInt(e.oid.split('.')[14]), cardPresentStatus: e.value == 0 ? 'not present' : 'present', cardPresentStatusValue: e.value })
            } else {
                const index = aONUs.findIndex(e => e.slot == varbinds[idx].oid.split('.')[14])
                if (index > -1) {
                    if (e.oid.split('.')[13] == 3) {
                        aONUs[index].authorizedCardTypeValue = e.value
                        aONUs[index].authorizedCardType = tables.cardTypeCode[e.value]
                    } else if (e.oid.split('.')[13] == 4) {
                        aONUs[index].actualCardTypeValue = e.value
                        aONUs[index].actualCardType = tables.cardTypeCode[e.value]
                    }
                }
            }
        })

        const cards = await card.getCardList(options)
        if (cards) {
            cards.forEach(card => {
                const index = aONUs.findIndex(e => e.slot == card.slot)
                if (index > -1)
                    aONUs[index].cardInformation = card
            })
        }
        return aONUs
    } catch (error) {
        console.error('Error: Unable to connect to OLT')
        return false
    }
}


module.exports = {
    getSlots,
    getSlotsInformationList
}
