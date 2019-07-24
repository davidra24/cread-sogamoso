import React from 'react';

function Miniloading(props) {
    return (
        <div className='d-flex justify-content-center'>
            <div className='lds-css ng-scope'>
                <div
                    style={{ width: '100%', height: '100%' }}
                    className='lds-flickr'>
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        </div>
    );
}
export default Miniloading;
