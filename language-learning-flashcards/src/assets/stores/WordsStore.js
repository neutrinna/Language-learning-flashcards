import { makeAutoObservable } from 'mobx';

export default class WordsStore {
    wordsAPI = [];
    error = null;
    isLoading = true;

    constructor(){
        makeAutoObservable(this);
    }

    refreshWordsAPI(){
        fetch( '/api/words' )
            .then( response => {
                if( response.ok ){
                    // console.log(response);
                    // console.log(response.json());
                    return response.json();
                } else{
                    throw new Error( 'Ошибка в выполнении запроса к серверу' );
                }})
            .then( response => {
                response.json();
                console.log(response.json());
                this.wordsAPI = response;
                setTimeout( () => this.isLoading = false, 500 );})
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