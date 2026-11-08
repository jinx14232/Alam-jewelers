export function titleCase(name){
        return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

export const tabsText = {
        'Women': 'women',
        'Men': 'men',
        'New Born': 'newBorn',
        'Gold': 'gold',
        'Silver': 'silver'
    }