export function getEnumValues<T>(enumObj: T): (T[keyof T])[] {
    return Object.values(enumObj as any) as (T[keyof T])[];
}

export function capitalizeFirstLetter(str: string): string {
    if (!str) return str;
    const newStr = `${str}`
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
}
