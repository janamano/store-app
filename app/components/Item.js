import React, { Component } from 'react';
import Notification from './Notification.js'
import {
    Modal,
    Button,
    TextInput,
    Form,
} from 'carbon-components-react';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isGuest: this.props.isGuest,
            stock: this.props.stock,
            notification: false,
            username: this.props.username

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.presentModal = this.presentModal.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    showNotification() {
        this.setState({ notification: true }, () =>
          setTimeout(() => this.setState({ notification: false }), 5000)
        );
      }
    

    handleSubmit(event) {
        console.log(this.state)
        event.preventDefault();
        if (this.state.stock > 0) {
            if (this.state.isGuest) {
                // only update in db
                this.setState({
                    visible: false
                })
                this.showNotification()
                fetch('/api/transaction', {
                    method: "PUT",
                     headers: {
                            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        item: this.props.name,
                    })
                })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    if ('success' in data) {
                        console.log("reducing")
                        this.setState({
                            stock: this.state.stock - 1
                        })
                        
                    }
                })
                .catch(err => {
                    console.log(err)
                })                
            } else {
                // validate amount
                this.setState({
                    visible: false
                })
                this.showNotification()
                fetch('/api/transaction', {
                    method: "POST",
                     headers: {
                            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                            'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.state.username,
                        item: this.props.name,
                        price: this.props.price,
                        date: (new Date()).toISOString().split('T')[0]
                    })
                })
                .then(res => {
                    return res.json()
                })
                .then(data => {
                    if ('success' in data) {
                        this.setState({
                            stock: this.state.stock - 1
                        })
                        
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }
    }

    componentDidMount() {
        console.log('--------------')
        console.log(this.state)
    }
    render() {
        var notification = this.state.notification
        return (
            <div className="">
                <h5 ><strong>{ this.props.name }</strong></h5>
                <p>
                    Price: { this.props.price } <br></br>
                    Stock: { this.state.stock }
                </p>
                {/* {this.state.visible && <ItemModal /> } */}
                { this.state.stock == 0 ?
                  <Button disabled onClick={e => this.setState({ visible: true})} kind="ghost">Buy</Button> :
                  <Button onClick={e => this.setState({ visible: true})} kind="ghost">Buy</Button>   
                }
                
                <Notification item={this.props.name} notification={this.state.notification} />
                <Modal
                    danger
                    modalHeading="Buying Item?"
                    open={this.state.visible}
                    onRequestClose={e => this.setState({ visible: false})}
                    primaryButtonText="Buy"
                    secondaryButtonText="Cancel"
                    onRequestSubmit={this.handleSubmit}>
                    <div>
                        {this.state.isGuest ? 
                            <p className="bx--modal-content__text">
                                Are you sure you want to buy this product as a guest?
                            </p> :
                            <p className="bx--modal-content__text">
                                Are you sure you want to buy this product? 
                            </p>
                        }          
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Item