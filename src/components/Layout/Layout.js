import React from 'react';
import Navigation from '../Navigation/Navigation';

const layout = (props) => {
    return (
            <main>
                <Navigation/>
                {props.children}
            </main>
    )
}

export default layout;