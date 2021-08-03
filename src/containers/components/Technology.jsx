import { memo } from "react";
import PropTypes from 'prop-types';
import { createMarkup } from "../../utils";
import { useHistory } from "react-router-dom";

function Technology({values}) {
    const history = useHistory();

    const renderImg = ({image, description}) => (
        <div className="img-box">
            <img src={image.url} alt={description} width="100%" />
        </div>
    );

    const openPost = (id) => {
        history.push(`/technology/${id}`);
    }

    const renderPost = (post, index) => {
        const {title, image, description, id} = post;

        return(
            <div key={`technology-${index}`} className="news-box">
                <article onClick={() => openPost(id)} className="article-box">
                    <p className="news-title">
                        <strong dangerouslySetInnerHTML={createMarkup(title)} />
                    </p>
                    <p dangerouslySetInnerHTML={createMarkup(description)} />
                    {image.url && renderImg({image, description})}
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

Technology.defaultProps = {
    values: []
};

Technology.propTypes = {
    values: PropTypes.array.isRequired
};

export default memo(Technology);

