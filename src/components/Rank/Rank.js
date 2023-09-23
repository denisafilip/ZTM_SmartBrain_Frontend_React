import React, { Fragment } from 'react';
import AuthService from "../AuthService";

const Rank = () => {
    return (
        <Fragment>
            <div>
                <div className="accent-black f3">
                    {'Your current entry count is...'}
                </div>
                <div className="accent-black f1">
                    {AuthService.getCurrentUser().entries}
                </div>
            </div>
        </Fragment>
    )
}

export default Rank;