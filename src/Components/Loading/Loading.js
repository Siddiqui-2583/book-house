import React from 'react';
import LoadingGif from '../../images/loading1.gif'
const Loading = (props) => {
    return (
        <div>
            <div className="text-center col-12 py-5 my-5" style={{display: props.loading}}>
                <img src={LoadingGif} alt="" />
                <h2>বই লোড হচ্ছে...</h2>
        </div>
        </div>
    );
};

export default Loading;