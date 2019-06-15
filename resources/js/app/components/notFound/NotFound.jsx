import React, { Fragment } from 'react';

function NotFound(props) {
    return (
        <Fragment>
            <div className="sea">
                <div className="circle-wrapper">
                    <div className="bubble" />
                    <div className="submarine-wrapper">
                        <div className="submarine-body">
                            <div className="window" />
                            <div className="engine" />
                            <div className="light" />
                        </div>
                        <div className="helix" />
                        <div className="hat">
                            <div className="leds-wrapper">
                                <div className="periscope" />
                                <div className="leds" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <br />
                <h1>
                    <strong>
                        Error 404! No hemos podido encontrar tu contenido :(
                    </strong>
                </h1>
            </div>
        </Fragment>
    );
}

export default NotFound;
