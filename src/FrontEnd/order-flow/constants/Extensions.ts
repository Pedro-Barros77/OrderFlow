function PadNumber(value: number, count: number | undefined): string {
    if (count == undefined)
        count = 2;

    return (new Array(count).join('0') + value).slice(-count);
}

function FillOdd(data: any, columns: number) {

    while (data.length % columns != 0) {
        data.push(Object.create(data[0]));
        data[data.length - 1].id = 0;
    }
    return data;
}

export { PadNumber,FillOdd };