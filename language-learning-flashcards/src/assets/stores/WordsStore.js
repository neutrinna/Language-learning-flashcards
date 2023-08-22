import { makeAutoObservable } from 'mobx';

export default class WordsStore {
    wordsAPI = this.refreshWordsAPI();
    error = null;
    isLoading = true;

    constructor(){
        makeAutoObservable(this);
    }

    async refreshWordsAPI(){
        fetch( '/api/words' )
            .then( response => {
                if( response.ok ){
                    return response.json();
                } else{
                    throw new Error( 'Ошибка в выполнении запроса к серверу' );
                }})
            .then( response => {
                this.wordsAPI = response;
                setTimeout( () => this.isLoading = false, 500 )})
            .catch( error => { 
                this.error = error;
                setTimeout( () => this.isLoading = false, 500 );
            });
    }
}


// try{ const response = await fetch( '/api/words' );
// if( response.ok ){
//     const data = await response.json();
//     this.wordsAPI = data;
//     console.log(data);
// } else {
//     throw new Error( 'Ошибка в выполнении запроса к серверу' );
// }
// setTimeout( () => this.isLoading = false, 500 );}

// catch( error ){
// this.error = error;
// setTimeout( () => this.isLoading = false, 500 );
// };


