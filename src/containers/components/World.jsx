import { memo } from "react";
import PropTypes from 'prop-types';
import {createMarkup} from '../../utils';
import { useHistory } from "react-router-dom";


function World({values}) {
    const history = useHistory();

    const renderImg = ({image, description}) => (
        <div className="img-box">
            <img src={image.url} alt={description} width="100%" />
        </div>
    );

    const openPost = (id) => {
        history.push(`/world/${id}`);
    };

    const renderPost = (post, index) => {
        const {title, image, description, id} = post;        

        return (
            <div key={`World-${index}`} className="news-box">
                <article onClick={() => openPost(id)} className="article-box">
                    <p className="news-title">
                        <strong dangerouslySetInnerHTML={createMarkup(title)} />
                    </p>
                    <p dangerouslySetInnerHTML={createMarkup(description)} />
                    {renderImg({image, description})}
                </article>
            </div>
        );
    };

    return (
        <div className="news-container">
            {values?.map(renderPost)}
        </div>
    );    
};

World.defaultProps = {
    values: []
}

World.propTypes = {
    values: PropTypes.array.isRequired
}

export default memo(World);