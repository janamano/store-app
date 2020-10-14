// import React from 'react';
// import { ToastNotification } from 'carbon-components-react';

// import Transition from 'react-transition-group/Transition';

// const duration = 300;

// const defaultStyle = {
//     position: 'fixed',
//     top: '0',
//     right: '-270px',
//     zIndex: '1000'
// };

// const transitionStyles = {
//     entered: {
//         transform: 'translateX(-100%)',
//         transition: `transform ${duration}ms ease-in-out`
//     },
//     exiting: {
//         transform: 'translateX(100%)',
//         transition: `transform ${duration}ms ease-in-out`
//     },
//     exited: {
//         right: '-270px'
//     }
// };

// const Notification = () => {
//   return (
//     <Transition in={this.props.notification} timeout={duration} unmountOnExit>
//     {(state) => (
//         <div style={{
//             ...defaultStyle,
//             ...transitionStyles[state]
//         }}>
//             <ToastNotification
//             title={'Success!'}
//             kind={'success'}
//             subtitle={'Succesfully bought the item. Expect a delivery soon!'}
//             hideCloseButton
//             caption={new Date().toString()}
//             />
//             </div>)}
//     </Transition>
//   );
// }
// export default Notification;

import React from 'react';
import { ToastNotification } from 'carbon-components-react';
import Transition from 'react-transition-group/Transition';

const duration = 300;

const defaultStyle = {
    position: 'fixed',
    top: '50px',
    right: '-270px',
    zIndex: '1000'
};

const transitionStyles = {
    entered: {
        transform: 'translateX(-100%)',
        transition: `transform ${duration}ms ease-in-out`
    },
    exiting: {
        transform: 'translateX(100%)',
        transition: `transform ${duration}ms ease-in-out`
    },
    exited: {
        right: '-270px'
    }
};

const Notification = ({ notification, item }) => {
    return (
        <Transition in={notification} timeout={duration} unmountOnExit>
            {(state) => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    <ToastNotification
                        title={'Success!'}
                        kind={'success'}
                        subtitle={'Succesfully purchased ' + item + '. Expect a delivery soon!' }
                        hideCloseButton
                        caption={new Date().toString()}
                    />
                </div>
            )}
        </Transition>
    );
}

export default Notification;
