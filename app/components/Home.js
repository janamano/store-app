import React, { Component } from 'react';
import {
    Header,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    Column,
    Row,
    Grid,
    Accordion,
    AccordionItem
} from 'carbon-components-react';
import Item from './Item.js';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            food: [],
            clothes: [],
            sports: []
        }

    }
    componentDidMount() {

        fetch('/api/getItems', {
            method: 'GET'
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
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
    }

    render() {
        return (<div className="container">

            <Header aria-label="Jana's Store">
                <HeaderName href="#" prefix="IBM">
                    Jana's Store
                </HeaderName>
                <HeaderNavigation>
                    <HeaderMenuItem href="/signin">Sign In</HeaderMenuItem>
                    <HeaderMenuItem href="/signup">Sign Up</HeaderMenuItem>
                    <HeaderMenuItem href="/about">About</HeaderMenuItem>
                </HeaderNavigation>

            </Header>
            {/* <Row  */}
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
                                        <Item isGuest={true} name={item.name} price={item.price} stock={item.stock} />
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
                                        <Item isGuest={true} name={item.name} price={item.price} stock={item.stock} />
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
                                        <Item isGuest={true} name={item.name} price={item.price} stock={item.stock} />
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

export default Home;