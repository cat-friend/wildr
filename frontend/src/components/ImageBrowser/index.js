import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { csrfFetch } from "../../store/csrf";
import { getImages } from '../../store/images';

const ImageBrowser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getImages())
    }, [dispatch]);

    const images = useSelector(state => {
        return Object.values(state.images);

    });

    return (
        <><h2>Image Browser</h2>
            <div className='image-browser'>
                {images.map((image) => {
                    return (
                        <img src={image.url} key={image.id} />
                    )
                })}
            </div>
        </>
    )
}

export default ImageBrowser;
