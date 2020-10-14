import React, { Component } from 'react'
import {
    Modal,
    ModalWrapper,
    Button
} from 'carbon-components-react';

class ItemModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal>
                <div className="bx--modal-header">
                    <h3>Buy Item</h3>
                </div>
                <div className="bx--modal-content">
                    <p className="bx--modal-content__text">
                        Are you sure you want to buy this product?
                </p>
                </div>
                <div className="bx--modal-footer bx--btn-set">
                    <Button className="bx--btn bx--btn--secondary">Cancel</Button>
                    <Button className="bx--btn bx--btn--danger">Buy</Button>
                </div>
          </Modal>
        )
    }
}

export default ItemModal;