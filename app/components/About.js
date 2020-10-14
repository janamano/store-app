import React, { Component } from 'react'
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
    Column
} from 'carbon-components-react';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [
                {
                    endpoint: '/test',
                    name: 'test'
                }
            ]
        }
    }

    render() {
        return(
            <div className="container">
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
                <Grid>
                    <Row style={{marginBottom: '5rem'}}></Row>
                </Grid>
                <h1>About...</h1>
                <p>This Store App is for educational purpose</p>
            </div>
        )
    }
} 

export default About;