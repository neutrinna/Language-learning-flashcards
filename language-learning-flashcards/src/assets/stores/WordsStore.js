import { makeAutoObservable, runInAction } from 'mobx';

export default class WordsStore {
    wordsAPI = [];
    error = null;
    isLoading = true;

    constructor(){
        makeAutoObservable( this );
    }

    setIsLoading = arg => {
        this.isLoading = arg;
        console.log(this.isLoading);
    }

    refreshWordsAPI = () => {
        this.isLoading = true;

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

    addNewWord = async newWord => {
        try{
            const response = await fetch( 'api/words/add', {
                method: 'POST',
                body: JSON.stringify( newWord ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
            const data = await response.json();
            // eslint-disable-next-line no-console
            console.log( 'word saved', data );
            setTimeout( () => this.setIsLoading( false ), 500 );
        }
        catch( error ){ 
            // eslint-disable-next-line no-console
            console.log( `Ошибка отправки слова на сервер: ${error}`);
            setTimeout( () => this.setIsLoading( false ), 500 );
        };
    }

    saveChanges = ( id, changedWord ) => {
            fetch( `api/words/${id}/update`, {
                method: 'POST',
                body: JSON.stringify( changedWord ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
                .then( response => response.json() )
                .then( changedWord => {
                    // eslint-disable-next-line no-console
                    console.log( changedWord );
                })
                // eslint-disable-next-line no-console
                .catch( error => console.log( `Ошибка отправки слова на сервер: ${error}`));
    }

    deleteWord = id => {
        fetch( `api/words/${id}/delete`, {
            method: 'POST',
            body: JSON.stringify( '' ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then( response => response.json() )
            .then( response => {
                // eslint-disable-next-line no-console
                console.log( response );
            })
            // eslint-disable-next-line no-console
            .catch( error => console.log( `Ошибка удаления слова: ${error}` ));
    };

}
