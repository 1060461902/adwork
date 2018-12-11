/**
 * @author xujuncong
 * @deprecated 主入口模块
 */
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

//Antd组件
import {Menu,Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const Item = Menu.Item;

import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import './main.less';

import {HashRouter,Route,Link} from 'react-router-dom'

//引入自定义组件
import Home from './components/home/home'
import UserInfo from './components/user_manager/user-info';
import BookInfo from './components/book_manager/book-info';
import BookExamine from './components/book_manager/book-examine'

class Sider extends Component{
    constructor(props){
        super(props);
        this.state = {
            current:'',
            username:''
        }
    }

    handleClick = (e) =>{
        this.setState({
            current:e.key
        });
    }

    getUser = () => {
        this.setState({
            username:'管理员'
        });
    }

    componentDidMount(){
        this.getUser();
    }

    render(){
        return(
            <div>
                <div id='left-menu'>
                    <img src='./assets/images/logo.png' width='50' id='logo'/>
                    <Menu theme='dark'
                        onClick={this.handleClick}
                        style={{width:200}}
                        defaultOpenKeys={['sub1','sub2']}
                        defaultSelectedKeys={[this.state.current]}
                        mode='inline'
                        locale={zhCN}
                    >
                        <SubMenu key='sub1' title={<span><Icon type='mail'/><span>图书管理</span></span>}>
                            <Item key='1'><Link to='/book_info'>图书信息</Link></Item>
                            <Item key='2'><Link to='/book_examine'>图书审核</Link></Item>
                        </SubMenu>
                        <SubMenu key='sub2' title={<span><Icon type='appstore'/><span>用户管理</span></span>}>
                            <Item key='3'><Link to='/user_info'>用户信息</Link></Item>
                        </SubMenu>
                    </Menu>
                </div>
                <div id='right-wrap'>
                    <Menu mode='horizontal'>
                        <SubMenu title={<span><Icon type='user'/>{this.state.username}</span>}>
                            <Item key='setting:1'>退出</Item>
                        </SubMenu>
                    </Menu>
                    <div className='right-box'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <HashRouter>
        <Sider>
            <Route exact path='/' component={Home}></Route>
            <Route path='/book_info' component={BookInfo}></Route>
            <Route path='/book_examine' component={BookExamine}></Route>
            <Route path='/user_info' component={UserInfo}></Route>
        </Sider>
    </HashRouter>,document.getElementById('app'));