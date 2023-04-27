import { Component } from 'react';
import './charList.scss';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
class CharList extends Component  {

    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService.getAllCharacters()
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onCharListLoaded = (charList) => {
        this.setState({
            charList, 
            loading: false,
            error: false,
        })
    }

    onError = () => {
        this.setState({             
            loading: false,
            error: true,
        })
    }

    CreateCharListItems = (charList) => {
    

        const elements = charList.map(item => {
            const {id, name, thumbnail} = item;
    
            let imgStyle = {'objectFit' : 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }
    
            return (
                <li key={id}
                    className="char__item"
                    onClick={() => this.props.onCharSelected(id)}>
                    <img style={imgStyle} src={thumbnail} alt={name}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    
        return <ul className="char__grid">{elements}</ul>
    }

    
    render() {
        const {charList, loading, error} = this.state;
        const elements = this.CreateCharListItems(charList)
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? elements : null


        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}



export default CharList;