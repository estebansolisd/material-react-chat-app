import React from 'react';
import {TextField, Grid, Button} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send'
import {Link} from "react-router-dom";
export default class RegisterForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        this.setState({user:e.target.value});
    }
    handleSubmit(){
        this.props.onChange(this.state.user);
    }
    render(){
        const classes = this.props;
        return(
            <Grid container spacing={16} direction="column" alignItems="center" justify="center" style={{height:"90vh"}}>
                <Grid item xs="auto">
                    <TextField placeholder="Write your nickname.." onChange={this.handleChange}/>
                </Grid>
                <Grid item xs="auto" >
                    <Link onClick={this.handleSubmit} onKeyPress={this.handleSubmit} to="/chat" style={{textDecoration:"none"}}>
                        <Button  onClick={this.handleSubmit} onKeyPress={this.handleSubmit}  variant="contained" color="primary" className={classes.button}>
                            Join
                            <SendIcon className={classes.rightIcon} />
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        );
    }
}
