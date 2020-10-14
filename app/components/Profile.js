import React, { Component } from 'react';
import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    Grid,
    Row,
    Tile,
    Column,
    OrderedList,
    ListItem,
    StructuredListWrapper,
    StructuredListRow,
    StructuredListCell,
    StructuredListHead,
    StructuredListBody 

} from 'carbon-components-react';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            password: '',
            email: '',
            transactions: []
        }
        this.handleSignOut = this.handleSignOut.bind(this)
    }
    
    handleSignOut() {
        fetch('/api/logout', {
            method: "GET"
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
           if ('success' in data) {
               this.props.history.push('/')
           }
        })
    }

    componentDidMount() {
        fetch('/api/getTransactions', {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data);
            this.setState({
                transactions: data.transactions
            })
        });

        fetch('/api/getUserInfo', {
            method: "GET"
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data.user)
            this.setState({
                name: data.name,
                id: data.id,
                email: data.email
            })
        })
    }

    render() {
        return(
            <div className="container">
                <Header aria-label="Jana's Store">
                    <HeaderName href="#" prefix="IBM">
                        Jana's Store
                    </HeaderName>
                    <HeaderNavigation>
                        <HeaderMenuItem href='/dashboard'>Dashboard</HeaderMenuItem>
                        <HeaderMenuItem onClick={this.handleSignOut}>Sign Out</HeaderMenuItem>
                        
                        {/* { this.state.links.map((link, index) => {
                            <HeaderMenuItem href={link.endpoint}>{link.name}</HeaderMenuItem>
                        }) } */}
                    </HeaderNavigation>

                </Header>
                <Grid>
                    <Row style={{marginBottom: '5rem'}}></Row>
                    <Row style={{marginBottom: '2rem'}}>
                        <p>Name: { this.state.name}</p>
                    </Row>
                    <Row style={{marginBottom: '2rem'}}>
                        <p>Username: { this.state.id}</p>
                    </Row>
                    <Row style={{marginBottom: '2rem'}}>
                        <p>Email: { this.state.email}</p>

                    </Row>     
                    <Row>
                        <Column>
                            <h3 style={{ margin: '0 0 30px' }}>Past Transactions</h3>
                        </Column>
                    </Row>  
                    <Row>
                        <StructuredListWrapper>
                            <StructuredListHead>
                                <StructuredListRow head>
                                    <StructuredListCell head>Item</StructuredListCell>
                                    <StructuredListCell head>Price</StructuredListCell>
                                    <StructuredListCell head>Date of Purchase</StructuredListCell>
                                </StructuredListRow>
                            </StructuredListHead>
                            <StructuredListBody>
                                {
                                    this.state.transactions.map((item, index) => {
                                        return (
                                        <StructuredListRow>
                                            <StructuredListCell>{item.item}</StructuredListCell>
                                            <StructuredListCell>{item.price}</StructuredListCell>
                                            <StructuredListCell>{item.date}</StructuredListCell>
                                        </StructuredListRow>)
                                    })
                                }
                            </StructuredListBody>
                        </StructuredListWrapper>
                        {/* <OrderedList>
                            {
                                this.state.transactions.map((item, index) => {
                                    return(
                                        <ListItem style={{marginTop: '2rem'}}>
                                            <strong>Item: </strong> { item.item }, <strong>Price: </strong> { item.price }   
                                        </ListItem>
                                    )
                                })
                            }
                        </OrderedList> */}
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Profile;
