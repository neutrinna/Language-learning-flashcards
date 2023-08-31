import { makeAutoObservable, runInAction } from 'mobx';

export default class WordsStore {
    wordsAPI = [];
    error = null;
    isLoading = true;
    needRefresh = false;

    constructor(){
        makeAutoObservable( this );
    }

    setNeedRefresh = () => {
        runInAction( () => this.needRefresh = !this.needRefresh);
    };

    refreshWordsAPI = () => {
        fetch( 'http://itgirlschool.justmakeit.ru/api/words/' )
            .then(response => {
                if (response.ok) { 
                    return response.json();
                } else {
                    throw new Error('Ошибка выполнения запроса к серверу ...');
                }
            })
            .then( response => {
                runInAction( () => this.wordsAPI = response );
            })
            .catch( error => { 
                runInAction( () => this.error = error );
            })
            .finally( setTimeout( () => runInAction( () => this.isLoading = false ), 500 ));
    };

    addNewWord = async newWord => {
        runInAction( () => this.isLoading = true );

        try{
            const response = await fetch( 'http://itgirlschool.justmakeit.ru/api/words/add', {
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
            setTimeout( () => runInAction( () => this.isLoading = false ), 500 );
        };
    };

    saveChanges = ( id, changedWord ) => {
        fetch( `http://itgirlschool.justmakeit.ru/api/words/${id}/update`, {
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
        fetch( `http://itgirlschool.justmakeit.ru/api/words/${id}/delete`, {
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
