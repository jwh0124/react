import React from "react";
import {Button, TextField, Link, Grid, Container, Typography} from "@material-ui/core";
import { signup } from "./service/ApiService";

class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const email = data.get("email");
        const password = data.get("password");
        signup({email: email, username: username, password:password}).then(
            (response) => {
                window.location.href="/login";
            });
    }
    
    render(){
        return (
            <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
                <form noValidate onSubmit={this.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5">
                                계정 생성
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField autoComplete="fname" 
                            name="username" 
                            variant="outlined" 
                            required 
                            fullWidth 
                            id="username" 
                            label="사용자 이름" 
                            autoFocus 
                            helperText="사용자 이름은 필수 항목입니다."
                            error={this.username === "" ? true :false}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth id="email" label="이메일 주소" name="email" autoComplete="email" helperText="이메일 주소는 필수 항목입니다."/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField variant="outlined" required fullWidth id="password" label="패스워드" name="password" type="password" autoComplete="current-password" helperText="패스워드는 필수 항목입니다."/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" fullWidth variant="contained" color="primary">계정 생성</Button>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                이미 계정이 있습니까? 로그인 하세요.
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        );
    }
}

export default SignUp