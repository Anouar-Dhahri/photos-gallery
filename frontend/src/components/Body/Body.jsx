import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import style from './Body.module.css';

function Body() {
    const [title, setTitle ] = useState('');
    const [photos, setPhotos] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        getPhotos();
    }, []);

    const getPhotos =  async () =>{
        try {
            const files = await Axios.get('http://localhost:5000/api/get');
            setData(files.data);
        } catch(error) {
            console.log(error);
        }
        
    } 

    const uploadPhotos = async() => {
        try{
            const formData = new FormData();
            formData.append('title', title);
            for (let i = 0; i < photos.length; i++) {
                formData.append('files', photos[i]);                      
            }

            await Axios.post('http://localhost:5000/api/add', formData);
            getPhotos();
            console.log("uploaded with success");
        }catch(error) {
            console.log(error);
        }
    }

    return (
        <div className= { style.container }>
            <div className= { style.form }>
                <form action="" method="post" onSubmit={e => e.preventDefault()}>
                    <input className={ style.input }type="text" placeholder="Title"  onChange={e => setTitle(e.target.value)} required/>
                    <input className={ style.file } type="file" id="file"   onChange={e => setPhotos(e.target.files)} accept="image/*" multiple required/>
                    <label htmlFor="file"><i className="fas fa-images"></i> Choose images</label>
                    <button  className={ style.button } onClick= { uploadPhotos }>Upload</button>
                </form>
            </div>
            {data.map((element, index) => (
                <div className={style.gallery}>
                    <h6 className={style.title}>{element.title}</h6>
                    <div key={element._id} className= {style.row}>
                        
                        {element.files.map((file, index) => (
                            <div key={index} className= {style.item}>
                                <figure><img src={`http://localhost:5000/${file.filePath}`} alt=""/></figure>
                            </div>
                        ))}
                    </div>
                </div>
            ))}  
        </div>
    )
}

export default Body
