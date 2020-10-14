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
    Column
} from 'carbon-components-react';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
            fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({
                    'username': this.state.id,
                    'password': this.state.password,
                }),
                headers: {
                    'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                return res.json()
            })
            .then(data => {
                if ('success' in data) {
                    this.props.history.push('/dashboard')
                } else{
                    // modal 
                }
                
                // console.log(data);
                
            })
            .catch(err => {
                console.log(err)
            });
        // }
    }


    render() {
        var value = this.state
        return (<div className="container">
            <Header aria-label="Jana's Store">
                <HeaderName href="#" prefix="IBM">
                    Jana's Store
                </HeaderName>
                <HeaderNavigation>
                    <HeaderMenuItem href="#">Sign In</HeaderMenuItem>
                    <HeaderMenuItem href="/signup">Sign Up</HeaderMenuItem>
                    <HeaderMenuItem href="/about">About</HeaderMenuItem>
                </HeaderNavigation>

            </Header>
            <Grid>
                <Row style={{marginBottom: '5rem'}}></Row>
                <Row>
                    <Column  sm={{ span: 2, offset: 1 }}>
                        <Form value={value} onChange={nextValue => this.handleChange(nextValue)}>
                            <div style={{marginBottom: '2rem'}}>
                                <TextInput
                                    id="id"
                                    required
                                    labelText="Username"
                                    placeholder="Enter a username"
                                />
                            </div>
                            <div style={{marginBottom: '2rem'}}>
                                <TextInput
                                    id="password"
                                    required
                                    type="password"
                                    labelText="Password"
                                    placeholder="Enter a password"
                                />
                            </div>
                            <Button onClick={this.handleSubmit} kind="primary" value="Submit" tabIndex={0} type="submit">Sign In</Button>
                        </Form>
                    </Column>
                </Row>
            </Grid>
        </div>
        )
    }
}

export default SignIn;