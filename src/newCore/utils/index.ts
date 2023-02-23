export const templateMap = <A extends any[]>(list: A, callback: (value: any, index: number, array: any[]) => A) => {
    return list.map((item, index)=> callback).join('');
}