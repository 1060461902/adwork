import React,{Component} from 'react';

import './home.css'

export default class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='greet-page'>
                <p>欢迎使用图书管理系统</p>
            </div>
        )
    }
}