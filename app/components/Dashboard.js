 import React, { Component } from 'react';
 import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    Form,
    TextInput,
    Grid,
    Button,
    Row,
    Column,
    HeaderGlobalAction,
    HeaderGlobalBar,
    Accordion,
    AccordionItem
} from 'carbon-components-react';
import Item from './Item.js'

 class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            food: [],
            clothes: [],
            sports: []
            // links: this.props.location.state.links
        }

        this.handleSignOut = this.handleSignOut.bind(this);
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
        fetch('/api/getUser', {
            method: "GET"
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data.user)
            this.setState({
                username: data.user
            })
        })
        .then(() => {
            fetch('/api/getItems', {
                method: 'GET'
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log('sssssssssssssss')
                console.log(data)
                var food = []
                var clothes = []
                var sports = []
                data['items'].map((item, index) => {
                    if (item['type'] === "Food") {
                        food.push(item)
                    } else if (item['type'] === "Clothes") {
                        clothes.push(item)
                    } else {
                        sports.push(item)
                    }
                })
                this.setState({
                    food: food,
                    clothes: clothes,
                    sports: sports
                })
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
                    <HeaderNavigation aria-label="Hi">
                        <HeaderMenuItem href="/profile">Profile</HeaderMenuItem>
                        <HeaderMenuItem onClick={this.handleSignOut}>Sign Out</HeaderMenuItem>
                    </HeaderNavigation>
                    <HeaderGlobalBar>
                        <HeaderGlobalAction
                            aria-label="Search">
                            Welcome, { this.state.username }
                        </HeaderGlobalAction>
                    </HeaderGlobalBar>
                </Header>
                <Grid>
                    <Row style={{marginTop: '5rem'}}>Welcome, { this.state.username }</Row>
                </Grid>
                <div style={{marginTop: '5rem', marginLeft: '2rem'}}>
                    <h1>Jana's Online Store</h1>
                    <p>Welcome to Jana's Online Store! Browse the catalogue below</p>
                    <h2 style={{marginTop: '3rem', marginBottom: '1rem'}}>Items for Sale</h2>
                </div>
                <Accordion>
                    <AccordionItem title="Food">
                        <Grid>
                            <Row  />
                            <Row>
                                { this.state.food.map((item, index) => {
                                    return(
                                        <Column>
                                            <Item username={this.state.username} name={item.name} price={item.price} stock={item.stock} />
                                        </Column>
                                    )
                                })}
                            </Row>
                        </Grid>
                    </AccordionItem>
                    <AccordionItem title="Clothes">
                        <Grid>
                            <Row  />
                            <Row>
                                { this.state.clothes.map((item, index) => {
                                    return(
                                        <Column>
                                            <Item username={this.state.username} name={item.name} price={item.price} stock={item.stock} />
                                        </Column>
                                    )
                                })}
                            </Row>
                        </Grid>
                    </AccordionItem>
                    <AccordionItem title="Sports">
                        <Grid>
                            <Row  />
                            <Row>
                                { this.state.sports.map((item, index) => {
                                    return(
                                        <Column>
                                            <Item username={this.state.username} name={item.name} price={item.price} stock={item.stock} />
                                        </Column>
                                    )
                                })}
                            </Row>
                        </Grid>
                    </AccordionItem>

                </Accordion>
            </div>
        )
    }
 }

 export default Dashboard;