
export default function getIngredients(){
    return fetch('./ingredients-list.csv')
    .then(response => response.text())
    .then(text => {
        return text.split( '\n' ).map( row => {
            const [name, id] = row.split(';') ;
            return { name, id } ;
        }) ;  
    }) 
}