import React from 'react';
import {TextField,Button,Grid,Typography,Paper} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import * as firebase from 'firebase';
export default class MessagesForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sendedInfo:{
                user: this.props.user,
                messages: "",
                date: new Date().toLocaleString()
            },
            messages:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    scrollToBottom = () => {
        this.messages.scrollIntoView({ behavior: "smooth" });
    }
    
    componentDidMount() {
        this.scrollToBottom();
    }
    
    componentDidUpdate() {
        this.scrollToBottom();
    }
    componentWillMount(){
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBVUIgdHityHT0RqHCDmWHYSZEWPvnJCBw",
            authDomain: "chat-react-84a7a.firebaseapp.com",
            databaseURL: "https://chat-react-84a7a.firebaseio.com",
            projectId: "chat-react-84a7a",
            storageBucket: "chat-react-84a7a.appspot.com",
            messagingSenderId: "207019049001"
        };
        if(!firebase.apps.length){
            firebase.initializeApp(config);
            this.getMessages();
        }
    }
    handleChange(e){
        let sendedInfo = Object.assign({}, this.state.sendedInfo);
        sendedInfo.messages = e.target.value;                        
        this.setState({sendedInfo});
    }
    handleSubmit(e){
        if(e.charCode === 13 || e.type === "click"){
            firebase
            .database()
            .ref("chats/")
            .push(this.state.sendedInfo);
        }
    }
    getMessages(){
        var messagesDB = firebase.database().ref("chats/");
        messagesDB.on("value", snapshot => {
            let newMessages = [];
            snapshot.forEach(child => {
                var data = child.val();
                newMessages.push({id: child.key, message: data.messages, user: data.user, date: data.date});
            });
            this.setState({messages: newMessages});
        })
    }
    renderMessages(){
        return this.state.messages.map(info =>
            (<Paper id={info.id}>
                <Typography variant="h6" gutterBottom>
                    {info.user}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                    {info.message}
                </Typography>
                <Typography variant="caption" gutterBottom>
                    {info.date}
                </Typography>
            </Paper>
            )
        );
    }
    render(){
        const classes = this.props;
        return(
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Paper style={{overflowY:"scroll",height:"80vh"}}> 
                            <Grid item xs={4} sm={2}>
                                {this.renderMessages()}
                                <div ref={el => { this.messages = el }}></div>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={16} style={{marginTop:"10px"}}>
                    <Grid item xs={7} sm={10}>
                        <TextField style={{width:"100%"}} placeholder="Write your messages.." onKeyPress={this.handleSubmit}  onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={3} sm={2}>
                        <Button style={{width:"100%"}} className={classes.button} variant="contained" color="primary" onClick={this.handleSubmit}>
                            Send
                            <SendIcon className={classes.rightIcon}/>
                        </Button>
                    </Grid>
                </Grid>    
            </div>
        );
    }
}