import { makeAutoObservable } from 'mobx';

export default class WordsStore {
    wordsAPI = [];
    error = null;
    isLoading = true;

    constructor(){
        makeAutoObservable( this );
    }

    refreshWordsAPI(){
        fetch( '/api/words' )
        .then(response => {
            if (response.ok) { 
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        })
        .then( response => {
            console.log( response );
            this.wordsAPI = response;
            setTimeout( () => this.isLoading = false, 500 );
        })
        .catch( error => { 
            this.error = error;
            console.log(error);
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