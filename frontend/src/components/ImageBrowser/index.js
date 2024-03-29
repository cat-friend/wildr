import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink} from 'react-router-dom';
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
        <div className='browser'><h2>Image Browser</h2>
            <div className='images'>
                {images.map((image) => {
                    return (
                        <NavLink to={`/images/${image.id}`} key={image.id}><img src={image.url} key={image.id} alt={image.title} className="thumbnails" /></NavLink>
                    )
                })}
            </div>
        </div>

    )
}

export default ImageBrowser;
