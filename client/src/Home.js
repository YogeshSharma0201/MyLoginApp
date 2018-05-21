import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

class Home extends Component {

    constructor() {
        super();

        this.state = {
            posts:null
        };

    }

    load() {
        var req = {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        };

        fetch('/posts', req).then((res)=>{
            return res.json();
        }).then((res)=>{
            console.log(res);
            this.setState({
                posts: res
            })
        }).catch((err)=>{
            console.log(err);
        })
    }

    render() {
        var that = this;
        function load() {
            if(that.state.posts==null) {
                that.load();
                return <h1>Loading...</h1>
            } else {
                return (
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Subject</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {that.state.posts.map((post, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{post.title}</td>
                                <td>{post.subject}</td>
                                <td>{post.description}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>);
            }
        }
        return (
            <div>
                {load()}
            </div>
        );
    }
}

export default Home;
