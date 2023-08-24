import { makeAutoObservable } from 'mobx';

export default class WordsStore {
    wordsAPI = [];
    error = null;
    isLoading = true;
    needRefresh = false;

    constructor(){
        makeAutoObservable( this );
    }

    setNeedRefresh = () => {
        this.needRefresh = !this.needRefresh;
    };

    refreshWordsAPI = () => {
        fetch( '/api/words' )
            .then(response => {
                if (response.ok) { 
                    return response.json();
                } else {
                    throw new Error('Ошибка выполнения запроса к серверу ...');
                }
            })
            .then( response => {
                this.wordsAPI = response;
            })
            .catch( error => { 
                this.error = error;
            })
            .finally( setTimeout( () => this.isLoading = false, 500 ));
    };

    addNewWord = async newWord => {
        this.isLoading = true;

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
        }
        catch( error ){ 
            // eslint-disable-next-line no-console
            console.log( `Ошибка отправки слова на сервер: ${error}`);  
        }
        finally{
            setTimeout( () => this.isLoading = false, 500 );
        };
    };

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
    };

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
