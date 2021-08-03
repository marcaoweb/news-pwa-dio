import { memo } from "react";
import PropTypes from 'prop-types';
import { createMarkup } from '../../utils';
import { useHistory } from "react-router-dom";

function Economy({values}) {
    const history = useHistory();

    const renderImg = ({image, description}) => (
        <div className="img-box">
            <img src={image.url} alt={description} width="100%" />
        </div>
    );

    const renderDescription = (description) => <p dangerouslySetInnerHTML={createMarkup(description)} />;

    const openPost = (id) => {
        history.push(`/economy/${id}`);
    };

    const renderPost = (post, index) => {
        const {title, image, description, id} = post;
        return (
            <div key={`post-${index}`} className="news-box">
                <article onClick={() => openPost(id)} className="article-box">
                    <p className="news-title">
                        <strong dangerouslySetInnerHTML={createMarkup(title)} />
                    </p>
                    {image?.url ? renderImg({ image, description }): renderDescription(description)}
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

Economy.defaultProps = {
    values: []
};

Economy.propTypes = {
    values: PropTypes.array.isRequired
};

export default memo(Economy);
