import React from 'react';
import { Layout } from 'antd';

const { Footer} = Layout;

function _Footer(){
    return(
        <Footer style={{
            marginLeft: 230,
            textAlign: 'center'}}>
           <p>Good Food ©2020 Created by Lụa Bùi</p>
        </Footer>
    );
}

export default _Footer;