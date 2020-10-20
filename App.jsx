import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ImageList from './components/ImageList';
import logo from './logo.png';


const App = () => {
    const [images, setImages] = useState([]);
    const Apikey = process.env.REACT_APP_PIXABAY_APIKEY;
    const onSearchSubmit = async(term) => {

        try{
            const params = {
                key: Apikey,
                q: term,
            };
            const response = await axios.get("https://pixabay.com/api/",{params});
            setImages(response.data.hits);
            if(response.data.total === 0) {
                window.alert('お探しの画像はありません。');
            }
        }catch{
            window.alert('通信が失敗しました。');
        }

    };

    return (
        <div className='ui container' style={{ margin: '20px' }}>
            <img src={logo} alt="pixabay-logo" className="pixabay-logo"/>
            <SearchBar onSubmit={onSearchSubmit} />
            <ImageList images={images}/>
        </div>
    );
};


export default App;