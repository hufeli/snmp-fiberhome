
const tables = require('./tables')
const snmp_fh = require('./pack-fiberhome')
const oid_fh = require('./oid-fh')
const slot = require('./slot')
const gFunc = require('./global-functions')

const OID = oid_fh.OIDs

function convertToOnuIndex(slot, pon, onuId) {
    return (slot) * 2 ** 25 + (pon) * 2 ** 19 + (onuId) * 2 ** 8
}

function parsePonIndex(ponIndex) {
    var indexBin = (parseInt(ponIndex)).toString(2)
    var obj = {
        _ponIndex: ponIndex,
        slot: parseInt(indexBin.slice(-33, -25), 2),
        pon: parseInt(indexBin.slice(-25, -19), 2),
    }
    return obj
}

async function getBasicPonPortList(options) {
    try {
        var aPon = []
        var varbinds = []
        
        try {
            const varbinds4 = await snmp_fh.subtree(options, OID.getPonPortList + '.4')
            varbinds.push(...varbinds4)
            const varbinds5 = await snmp_fh.subtree(options, OID.getPonPortList + '.5')
            varbinds.push(...varbinds5)
            const varbinds12 = await snmp_fh.subtree(options, OID.getPonPortList + '.12')
            varbinds.push(...varbinds12)
        } catch (error) {
            console.error('Error: Unable to connect to OLT')
            return false
        }

        varbinds.forEach((e, idx) => {
            if (e.oid.split('.')[13] == 4) {
                var objPortIndex = parsePonIndex(parseInt(e.oid.split('.')[14]))
                aPon.push({ portIndex: objPortIndex._ponIndex, slot: objPortIndex.slot, pon: objPortIndex.pon, portEnableStatusValue: e.value, portEnableStatus: e.value == 1 ? 'enable' : e.value == 0 ? 'disable' : 'undefined' })
            } else {
                var index = aPon.findIndex(el => el.portIndex == varbinds[idx].oid.split('.')[14])
                if (index > -1) {
                    if (e.oid.split('.')[13] == 4) {
                        aPon[index].portEnableStatusValue = e.value
                        aPon[index].portEnableStatus = e.value == 1 ? 'enable' : e.value == 0 ? 'disable' : 'undefined'
                    } else if (e.oid.split('.')[13] == 5) {
                        aPon[index].portOnlineStatusValue = e.value
                        aPon[index].portOnlineStatus = e.value == 1 ? 'online' : e.value == 0 ? 'offline' : 'undefined'
                    } else if (e.oid.split('.')[13] == 12)
                        aPon[index].authorizedOnus = e.value
                }
            }
        })
        return aPon
    } catch (err) {
        throw err
    }
}

async function getPonPortList(options) {
    try {
        var aPon = []
        var varbinds = []
        
        try {
            const varbinds1 = await snmp_fh.subtree(options, OID.getPonPortList + '.1')
            varbinds.push(...varbinds1)
            const varbinds2 = await snmp_fh.subtree(options, OID.getPonPortList + '.2')
            varbinds.push(...varbinds2)
            const varbinds3 = await snmp_fh.subtree(options, OID.getPonPortList + '.3')
            varbinds.push(...varbinds3)
            const varbinds4 = await snmp_fh.subtree(options, OID.getPonPortList + '.4')
            varbinds.push(...varbinds4)
            const varbinds5 = await snmp_fh.subtree(options, OID.getPonPortList + '.5')
            varbinds.push(...varbinds5)
            const varbinds6 = await snmp_fh.subtree(options, OID.getPonPortList + '.6')
            varbinds.push(...varbinds6)
            const varbinds12 = await snmp_fh.subtree(options, OID.getPonPortList + '.12')
            varbinds.push(...varbinds12)
            const varbinds13 = await snmp_fh.subtree(options, OID.getPonPortList + '.13')
            varbinds.push(...varbinds13)
        } catch (error) {
             console.error('Error: Unable to connect to OLT')
             return false
        }

        varbinds.forEach((e, idx) => {
            if (e.oid.split('.')[13] == 1) {
                var objPortIndex = parsePonIndex(parseInt(e.oid.split('.')[14]))
                aPon.push({ portIndex: objPortIndex._ponIndex, slot: objPortIndex.slot, pon: objPortIndex.pon, portTypeValue: e.value, portType: tables.portTypeCode[e.value] })
            } else {
                var index = aPon.findIndex(el => el.portIndex == varbinds[idx].oid.split('.')[14])
                if (index > -1) {
                    if (e.oid.split('.')[13] == 2)
                        aPon[index].portName = e.value.toString()
                    else if (e.oid.split('.')[13] == 3)
                        aPon[index].portDescription = e.value.toString()
                    else if (e.oid.split('.')[13] == 4) {
                        aPon[index].portEnableStatusValue = e.value
                        aPon[index].portEnableStatus = e.value == 1 ? 'enable' : e.value == 0 ? 'disable' : 'undefined'
                    } else if (e.oid.split('.')[13] == 5) {
                        aPon[index].portOnlineStatusValue = e.value
                        aPon[index].portOnlineStatus = e.value == 1 ? 'online' : e.value == 0 ? 'offline' : 'undefined'
                    } else if (e.oid.split('.')[13] == 6) {
                        aPon[index].portDownlinkRate = e.value
                        aPon[index].portDownlinkRateUnit = 'Mbit/s'
                    } else if (e.oid.split('.')[13] == 12)
                        aPon[index].authorizedOnus = e.value
                    else if (e.oid.split('.')[13] == 13) {
                        aPon[index].portUplinkRate = e.value
                        aPon[index].portUplinkRateUnit = 'Mbit/s'
                    }
                }
            }
        })
        return aPon
    } catch (err) {
        throw err
    }
}

async function getOltInformation(options) {
    try {
        var olt = {}
        let varbindsBasic
        try {
            varbindsBasic = await snmp_fh.subtree(options, OID.getOltBasicInformation)
        } catch (error) {
             throw new Error(`Unable to connect to OLT,\n ${error}`)
        }

        for (let idx = 0; idx < varbindsBasic.length; idx++) {
            const e = varbindsBasic[idx]
            if (e.oid.split('.')[7] == 1)
                olt.alias = e.value.toString()
            else if (e.oid.split('.')[7] == 2) {
                olt.hardwareModel = tables.oltModels[e.value]
                olt.oid = e.value
            } else if (e.oid.split('.')[7] == 3) {
                olt.systemRunningTime = e.value
                olt.systemRunningTimeUnit = 'ms'
            } else if (e.oid.split('.')[7] == 4)
                olt.systemContact = e.value.toString()
            else if (e.oid.split('.')[7] == 5)
                olt.systemName = e.value.toString()
            else if (e.oid.split('.')[7] == 6)
                olt.systemLocation = e.value.toString()
        }

        const varbinds = await snmp_fh.subtree(options, OID.getOltInformation)
        
        for (let idx = 0; idx < varbinds.length; idx++) {
            const e = varbinds[idx]
            if (e.oid.split('.')[11] == 1)
                olt.ip = e.value
            else if (e.oid.split('.')[11] == 2)
                olt.macAddress = e.value.toString()
            else if (e.oid.split('.')[11] == 3)
                olt.softwareVersion = e.value.toString()
            else if (e.oid.split('.')[11] == 4)
                olt.hardwareVersion = e.value.toString()
            else if (e.oid.split('.')[11] == 5) {
                olt.temperature = e.value
                olt.temperatureUnit = '°C'
            }
        }
        
        olt.subrack = await getSubrackInformation(options)
        olt.slots = await slot.getSlots(options)
        return olt

    } catch (err) {
        throw err
    }
}

async function getOltModel(options) {
    try {
        try {
            const data = await snmp_fh.get(options, ['1.3.6.1.2.1.1.2.0'])
            return tables.oltModels[data[0].value]
        } catch (error) {
            console.error('Error: Unable to connect to OLT')
            throw new Error("Estoy triste")
        }
    } catch (err) {
        throw err
    }
}

async function getPonPort(options, slot, pon) {
    try {
        const isValid = await gFunc.isValid(options, slot, pon)
        if (isValid && slot && pon) {
            var ponPort = null
            const portIndex = convertToOnuIndex(slot, pon, 0)
            var oid = OID.getPonPortList
            
            try {
                const data = await snmp_fh.get(options, [oid + '.1.' + portIndex, oid + '.2.' + portIndex, oid + '.3.' + portIndex, oid + '.4.' + portIndex, oid + '.5.' + portIndex, oid + '.6.' + portIndex, oid + '.12.' + portIndex, oid + '.13.' + portIndex,])
                data.forEach((e, idx) => {
                    if (e.oid.split('.')[13] == 1) {
                        var objPortIndex = parsePonIndex(parseInt(e.oid.split('.')[14]))
                        ponPort = { portIndex: objPortIndex._ponIndex, slot: objPortIndex.slot, pon: objPortIndex.pon, portTypeValue: e.value, portType: tables.portTypeCode[e.value] }
                    } else if (e.oid.split('.')[13] == 2)
                        ponPort.portName = e.value.toString()
                    else if (e.oid.split('.')[13] == 3)
                        ponPort.portDescription = e.value.toString()
                    else if (e.oid.split('.')[13] == 4) {
                        ponPort.portEnableStatusValue = e.value
                        ponPort.portEnableStatus = e.value == 1 ? 'enable' : e.value == 0 ? 'disable' : 'undefined'
                    } else if (e.oid.split('.')[13] == 5) {
                        ponPort.portOnlineStatusValue = e.value
                        ponPort.portOnlineStatus = e.value == 1 ? 'online' : e.value == 0 ? 'offline' : 'undefined'
                    } else if (e.oid.split('.')[13] == 6) {
                        ponPort.portDownlinkRate = e.value
                        ponPort.portDownlinkRateUnit = 'Mbit/s'
                    } else if (e.oid.split('.')[13] == 12)
                        ponPort.authorizedOnus = e.value
                    else if (e.oid.split('.')[13] == 13) {
                        ponPort.portUplinkRate = e.value
                        ponPort.portUplinkRateUnit = 'Mbit/s'
                    }
                })
                return ponPort
            } catch (error) {
                console.error('Error: Unable to connect to OLT')
                return false
            }
        } else return false
    } catch (err) {
        throw err
    }
}

async function getSubrackInformation(options) {
    try {
        var obj = {}
        try {
            const varbinds = await snmp_fh.subtree(options, OID.getSubtrackInformation)
            varbinds.forEach(e => {
                if (e.oid.split('.')[13] == 1)
                    obj.subrackIndex = e.value
                else if (e.oid.split('.')[13] == 2)
                    obj.subrackType = tables.subrackType[e.value] || 'not found'
                else if (e.oid.split('.')[13] == 3)
                    obj.subrackName = e.value.toString()
                else if (e.oid.split('.')[13] == 4)
                    obj.totalSlotNumber = e.value
            })
            return obj
        } catch (error) {
            console.error('Error: Unable to connect to OLT')
            return false
        }
    } catch (err) {
        throw err
    }
}


module.exports = {
    getBasicPonPortList,
    getPonPortList,
    getOltInformation,
    getOltModel,
    getPonPort,
    getSubrackInformation
}
