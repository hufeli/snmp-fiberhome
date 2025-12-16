
const OIDs = {

    // OLT
    getOltBasicInformation: "1.3.6.1.2.1.1",
    getOltInformation: "1.3.6.1.4.1.5875.800.3.9.4",

    // SLOT
    getPonPortList: "1.3.6.1.4.1.5875.800.3.9.3.4.1",
    getSlot: "1.3.6.1.4.1.5875.800.3.101.1.1.1",
    getSlotsInformationList: "1.3.6.1.4.1.5875.800.3.9.5.1.1",
    getSubtrackInformation: "1.3.6.1.4.1.5875.800.3.9.1.1.1",

    // CARD
    getCardInformation: "1.3.6.1.4.1.5875.800.3.9.2.1.1",
    getPortName: "1.3.6.1.4.1.5875.800.3.9.3.4.1.2",

    // ONU
    confirmGetOnusBySlot: '1.3.6.1.4.1.5875.91.1.13.3.1.1.6.2',
    confirmGetOnuWebAdmin: '1.3.6.1.4.1.5875.91.1.22.1.1.1.37.2',
    confirmListOpticalRxPowerByPon: "1.3.6.1.4.1.5875.91.1.21.3.1.1.4.2",
    confirmGetOnuOpticalPower: "1.3.6.1.4.1.5875.91.1.22.3.1.1.6.2",
    delOnuByMacAddress: '1.3.6.1.4.1.5875.91.1.13.1.1.1.4.1',
    confirmDelOnuByMacAddress: '1.3.6.1.4.1.5875.91.1.13.1.1.1.4.2',
    getAuth: "1.3.6.1.4.1.5875.800.3.10.1.1",
    getOnuIdListByPon: '1.3.6.1.4.1.5875.91.1.1.1.1.1.23.1',
    confirmGetOnuIdListByPon: '1.3.6.1.4.1.5875.91.1.1.1.1.1.23.2',
    getOnuBandwidth: '1.3.6.1.4.1.5875.91.1.6.1.1.1.40.1',
    getOnuFirmwareVersion: "1.3.6.1.4.1.5875.800.3.10.1.1.14",
    getOnuHardwareVersion: "1.3.6.1.4.1.5875.800.3.10.1.1.13",
    getOnuId: "1.3.6.1.4.1.5875.800.3.10.1.1.4",
    getOnuIp: "1.3.6.1.4.1.5875.800.3.10.1.1.6",
    getOnuLastOffTime: "1.3.6.1.4.1.5875.91.1.22.3.1.1.28.1",
    getOnuLogicAuthId: "1.3.6.1.4.1.5875.800.3.10.1.1.8",
    getOnuLogicAuthIdPass: "1.3.6.1.4.1.5875.800.3.10.1.1.9",
    getOnuMacAddress: "1.3.6.1.4.1.5875.800.3.10.1.1.10",
    getOnuPon: "1.3.6.1.4.1.5875.800.3.10.1.1.3",
    getOnuRemoteRestart: "1.3.6.1.4.1.5875.800.3.10.1.1.15",
    getOnuListBySlot: '1.3.6.1.4.1.5875.91.1.13.3.1.1.6.1', // todo
    getOnuIdList: "1.3.6.1.4.1.5875.800.3.10.1.1.4",
    getOnuIndexList: "1.3.6.1.4.1.5875.800.3.101.2.1.1",
    getOnuSlot: "1.3.6.1.4.1.5875.800.3.10.1.1.2",
    getOnuSoftwareVersion: "1.3.6.1.4.1.5875.800.3.10.1.1.12",
    getOnuStatus: "1.3.6.1.4.1.5875.800.3.10.1.1.11",
    getOnuSystemName: "1.3.6.1.4.1.5875.800.3.10.1.1.7",
    getOnuType: "1.3.6.1.4.1.5875.800.3.10.1.1.5",
    getOnuWebAdmin: '1.3.6.1.4.1.5875.91.1.22.1.1.1.37.1',
    getRxPowerListByPon: "1.3.6.1.4.1.5875.91.1.21.3.1.1.4.1",
    getSerials: "1.3.6.1.4.1.5875.800.3.10.1.1.10",
    getOnuOpticalPower: "1.3.6.1.4.1.5875.91.1.22.3.1.1.6.1",
    getOnuRxPowerListByPon: "1.3.6.1.4.1.5875.91.1.21.3.1.1.4.1",
    confirmGetOnuRxPowerListByPon: "1.3.6.1.4.1.5875.91.1.21.3.1.1.4.2",
    getUnauth: "1.3.6.1.4.1.5875.800.3.11.1.1",
    confirmGetOnuDistance: "1.3.6.1.4.1.5875.91.1.6.3.1.1.7.2",
    confirmGetOnuLastOffTime: "1.3.6.1.4.1.5875.91.1.22.3.1.1.28.2",
    getOnuDistance: "1.3.6.1.4.1.5875.91.1.6.3.1.1.7.1",
    onuGetUplinkInterfaceDownlinkRate: "1.3.6.1.4.1.5875.800.3.9.3.3.1.5",
    onuGetUplinkInterfacePortDescription: "1.3.6.1.4.1.5875.800.3.9.3.3.1.3",
    onuGetUplinkInterfacePortName: "1.3.6.1.4.1.5875.800.3.9.3.3.1.2",
    onuGetUplinkInterfacePortStatus: "1.3.6.1.4.1.5875.800.3.9.3.3.1.4",
    onuGetUplinkInterfacePortType: "1.3.6.1.4.1.5875.800.3.9.3.3.1.1",
    onuGetUplinkInterfaceUplinkRate: "1.3.6.1.4.1.5875.800.3.9.3.3.1.12",
    setAuth: "1.3.6.1.4.1.5875.91.1.13.1.1.1.3.1",
    confirmSetAuth: "1.3.6.1.4.1.5875.91.1.13.1.1.1.3.2",
    setLanPorts: "1.3.6.1.4.1.5875.91.1.8.1.1.1.5.1",
    confirmSetLanPorts: "1.3.6.1.4.1.5875.91.1.8.1.1.1.5.2",
    setLanPortsEPON: "1.3.6.1.4.1.5875.91.1.8.1.1.1.6.1",
    confirmSetLanPortsEPON: "1.3.6.1.4.1.5875.91.1.8.1.1.1.6.2",
    setOnuBandwidth: '1.3.6.1.4.1.5875.91.1.6.1.1.1.40.1',
    confirmSetOnuBandwidth: '1.3.6.1.4.1.5875.91.1.6.1.1.1.40.2',
    setWan: '1.3.6.1.4.1.5875.91.1.8.1.1.1.13.1',
    confirmSetWan: '1.3.6.1.4.1.5875.91.1.8.1.1.1.13.2',
    rebootOnu: '1.3.6.1.4.1.5875.91.1.6.2.1.1.6.1',
    gponVeipService: {
        //id: '1.3.6.1.4.1.5875.800.3.30.3.1.1',
        tls: '1.3.6.1.4.1.5875.800.3.30.3.1.2',
        cvlan: '1.3.6.1.4.1.5875.800.3.30.3.1.3',
        cvlan_cos: '1.3.6.1.4.1.5875.800.3.30.3.1.4',
        tvlan: '1.3.6.1.4.1.5875.800.3.30.3.1.5',
        tvlan_cos: '1.3.6.1.4.1.5875.800.3.30.3.1.6',
        svlan: '1.3.6.1.4.1.5875.800.3.30.3.1.7',
        svlan_cos: '1.3.6.1.4.1.5875.800.3.30.3.1.8',
        us_band_width: '1.3.6.1.4.1.5875.800.3.30.3.1.9',
        ds_band_width: '1.3.6.1.4.1.5875.800.3.30.3.1.10',
        profile_name: '1.3.6.1.4.1.5875.800.3.30.3.1.11',
        //action: '1.3.6.1.4.1.5875.800.3.30.3.1.12'
    }
}

/* Válido para números de qualquer tamanho (limitado pelo MAX_SAFE_INTEGER do JS) */
function oidDecodeHexToInt(hexValue) {
    const hex = hexValue.replaceAll(' ', '')
    let value = 0
    for (let i = 0; i < hex.length; i += 2) {
        const byte = parseInt(hex.substr(i, 2), 16)
        value = (value * 128) + (byte & 0x7F)
    }
    return value
}

/* Válido para números de qualquer tamanho (limitado pelo MAX_SAFE_INTEGER do JS) */
function oidEncodeIntToHex(intValue) {
    if (intValue < 0) return null
    
    let hex = ''
    const chunks = []
    let value = intValue
    
    // Caso especial para 0
    if (value === 0) {
        chunks.push(0)
    } else {
        // Divide em pedaços de 7 bits
        while (value > 0) {
            chunks.unshift(value & 0x7F) // Pega os últimos 7 bits
            value = value >>> 7          // Shift right por 7 bits (unsigned)
        }
    }
    
    // Define o bit mais significativo (MSB) para todos, exceto o último pedaço
    for (let i = 0; i < chunks.length - 1; i++) {
        chunks[i] |= 0x80
    }
    
    // Converte para string hexadecimal
    hex = chunks.map(chunk => chunk.toString(16).padStart(2, '0')).join('')
    
    return hex
}

function oidEncodeStrToHex(oidStr) {
    let hex = ''
    const oid = oidStr.split('.')
    if (oid[0] == parseInt(1) && oid[1] == parseInt(3)) {
        oid.splice(0, 2)        // remove
        hex = '2b'              // 2b = 1.3
    }
    oid.forEach(e => {
        hex += oidEncodeIntToHex(parseInt(e))
    })
    return hex
}


module.exports = {
    OIDs,
    oidEncodeStrToHex,
    oidEncodeIntToHex,
    oidDecodeHexToInt
}
