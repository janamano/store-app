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
    Modal,
    UnorderedList,
    ListItem
} from 'carbon-components-react';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
            password: '',
            email: '',
            validation: [],
            visible: false

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var isValid = this.validateForm();
        if (isValid) {
            fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    'name': this.state.name,
                    'id': this.state.id,
                    'password': this.state.password,
                    'email': this.state.email,
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
                
                this.props.history.push("/dashboard");                
            })
            .catch(err => {
                console.log(err)
            });
        }
    }

    validateForm() {
        var arr = [];
        if (this.state.password.length < 8) {
            arr.push("Password needs to be atleast 8 characters long.")
        }
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        if (!expression.test(String(this.state.email).toLowerCase())) {
            arr.push("Enter a valid email.");
        }
        this.setState({validation: arr});
        if (arr.length == 0) {
            return true
        } else {
            this.setState({
                visible: !this.state.visible
            })
            return false
        }
    }

    render() {
        var value = this.state
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
            <Grid>
                <Row style={{marginBottom: '5rem'}}></Row>
                <Row>
                    <Column  sm={{ span: 2, offset: 1 }}>
                        <Form value={value} onChange={nextValue => this.handleChange(nextValue)}>
                            <div style={{marginBottom: '2rem'}}>
                                <TextInput
                                    id="name"
                                    required
                                    value={this.state.name}
                                     onChange={this.handleChange}
                                    labelText="Name"
                                    placeholder="Enter your full name"
                                />
                            </div>
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
                                    id="email"
                                    required
                                    labelText="Email"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div style={{marginBottom: '2rem'}}>
                                <TextInput
                                    id="password"
                                    type="password"
                                    required
                                    labelText="Password"
                                    placeholder="Enter a password"
                                />
                            </div>
                            <Button onClick={this.handleSubmit} kind="primary" value="Submit" tabIndex={0} type="submit">Sign Up</Button>
                        </Form>
                        <Modal
                            danger
                            size='md'
                            modalHeading="Warnings"
                            open={this.state.visible}
                            onRequestClose={e => this.setState({ visible: false})}
                            primaryButtonText="Ok"
                            secondaryButtonText="Cancel"
                            onRequestSubmit={e => this.setState({ visible: false})}>
                            <h4>Sign Up Failed due to validation errors:</h4>
                            <UnorderedList>
                                {
                                    this.state.validation.map((item, index) => {
                                        return(
                                            <ListItem>
                                                { item }
                                            </ListItem>
                                        )
                                    })
                                }
                            </UnorderedList>
                        </Modal>
                    </Column>
                </Row>
            </Grid>
        </div>
        )
    }
}

export default SignUp;