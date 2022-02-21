export function formatRank(rank){
    let lastDigit = rank.toString().slice(-1);
    let suffix = 'th';
    if(lastDigit === '1'){
        suffix = 'st';
    } else if(lastDigit === '2'){
        suffix= 'nd';
    } else if (lastDigit === '3'){
        suffix = 'rd'
    }
    return rank + suffix
}
