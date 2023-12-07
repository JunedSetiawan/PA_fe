
/**
 * Number
 */
export const setDigit = (number: string | number, digitLength: number) => ((Number(number)).toLocaleString('en-US', { minimumIntegerDigits: digitLength }))

export const formatRupiah = (nominal: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(nominal);
}

export function numberToRoman(num?: number) {
    if (!num || isNaN(num)) return ''
    var roman = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    var str = '';

    for (var [keyRoman, valueRoman] of Object.entries(roman)) {
        var q = Math.floor(num / valueRoman);
        num -= q * valueRoman;
        str += keyRoman.repeat(q);
    }

    return str;
}



/**
 * Date
 */
export const epoch10to13 = (epoch: number) => (Math.floor(epoch * 1000))

export const epoch13to10 = (epoch: number) => (Math.floor(epoch / 1000))



/**
 * URL
 */
export const objectToQueryUrl = (params: Record<string, any>) => {
    let queryPharams: Array<any> = [];
    try {
        Object.keys(params).forEach((res) => {
            if (params[res]) {
                queryPharams.push(encodeURIComponent(res) + "=" + encodeURIComponent(params[res]));
            }
        })
    } catch (error) { }
    return queryPharams.join("&")
}

export const queryUrToObject = (params: string) => {
    // let queryPharams: Array<any> = [];
    // try {
    //     Object.keys(params).forEach((res) => {
    //         if (params[res]) {
    //             queryPharams.push(encodeURIComponent(res) + "=" + encodeURIComponent(params[res]));
    //         }
    //     })
    // } catch (error) { }
    // return queryPharams.join("&")
}



/**
 * File
 */
export function blobToFile(blob: string, resultFileName: string) {
    const binary = atob(blob.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    const resultFile = new File([new Uint8Array(array)], resultFileName, {
        type: 'image/png'
    });
    return resultFile
}