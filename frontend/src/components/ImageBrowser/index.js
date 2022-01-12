import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { csrfFetch } from "../../store/csrf";
import { getImages } from '../../store/images';

const ImageBrowser = () => {
    const dispatch = useDispatch();
    const { photoId } = useParams();
    useEffect(() => {
        dispatch(getImages())
    }, [dispatch]);

    const images = useSelector(state => {
        return Object.values(state.images);

    });

    return (
        <><h2>image browser</h2>
            <div className='image-browser'>
                {images.map((image) => {
                    return (
                        <NavLink key={image.id} to={`/api/images/${image.id}`}>
                            <img src={image.url} key={image.id} />
                        </NavLink>
                    )
                })}
            </div>
        </>
    )
}

export default ImageBrowser;
