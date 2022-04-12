/**
 * 
 * @param {object[] | object} itemToFilter Object or array of objects to remove disallowed properties from.
 * @param {...string} filteredProperties Key names of properties that should be removed from resulting array or object.
 * @returns Object or array of objects whose properties have been filtered.
 */
export default function stripProperties(itemToFilter: Array<object> | object, ...filteredProperties: string[]): Array<object> | object | undefined {
    if (Array.isArray(itemToFilter)) {
        return itemToFilter.map((item: Record<string, any>) => {
            return getFilteredObject(item, ...filteredProperties);
        });
    } else if (typeof itemToFilter === "object") {
        return getFilteredObject(itemToFilter, ...filteredProperties);
    } else {
        return undefined;
    }
}

function getFilteredObject(item: Record<string, any>, ...filteredProperties: string[]): Record<string, any> {
    return Object.keys(item).filter((key: string) => {
        return !filteredProperties.includes(key);
    }).reduce((prev: Record<string, any>, current: string) => {
        prev[current] = item[current];

        return prev;
    }, {}); 
}
