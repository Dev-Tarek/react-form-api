import React from 'react';
import Textfield from './Textfield';
import Paper from '@material-ui/core/Paper';
import Button from './Button';
import axios from 'axios';

let data = {};
let item = {};
let checker = null;
let warning = null;

const style = {
    maxHeight: '600px',
    overflowY: 'scroll',
    overflow: 'hidden',
    margin: '10px',
    padding: '10px',
    border: '1px solid grey',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
};

const getInputValue = (attr, value) => {
    data[attr] = value;
    // console.log(data);
};

const inputCheck = () => {
    if(data.userName && data.password && data.name && data.mobile && data.address){
        warning = null;
        return true;
    }
    warning = (<p style={{padding: 4, color: 'darkred'}}>Please complete the form.</p>);
    checker();
    return false;
}

const addHandler = () => {
    if(inputCheck())
    axios.post('http://employeesintern.azurewebsites.net/api/employees', data)
    .then( response => {
        console.log(response);
        checker();
    })

        
};

const deleteHandler = () => {
    axios.delete('http://employeesintern.azurewebsites.net/api/employees/'+item.id)
    .then( response => {
        console.log(response);
        checker();
        data = {};
        item = {};
    });
};

const updateHandler = () => {
    if(inputCheck())
    axios.put('http://employeesintern.azurewebsites.net/api/employees/'+item.id, data)
    .then( response => {
        console.log(response);
        checker();
        data = {};
        item = {};
    });
};

function fetchSelectedData(item){
    let data = Object.assign({}, item);
    delete(data.clicked);
    return data;
}

export default props => {
    checker = props.check;
    item = {};
    data = {};
    let add = true;
    if(props.values !== null && props.values !== -1){
        add = false;
        item = props.values;
        data = fetchSelectedData(item);
    }

    return(
    <Paper style={style}>
        <label style={{fontSize: 20}}>{props.title}</label>
        <form>
        <Textfield attr='name' name='Name' value={item.name || ''} collector={getInputValue} required />
        <Textfield attr='userName' name='Username' value={item.userName || ''} collector={getInputValue} required />
        <Textfield attr='password' name='Password' value={item.password || ''} collector={getInputValue} required />
        <Textfield attr='telephone' name='Phone' value={item.telephone || ''} collector={getInputValue} required />
        <Textfield attr='mobile' name='Mobile' value={item.mobile || ''} collector={getInputValue} required />
        <Textfield attr='address' name='Address' value={item.address || ''} collector={getInputValue} required />
        {warning}
        <Button text='Add' disabled={!add} click={addHandler} />
        <Button color='primary' text='Update' disabled={add} click={updateHandler} />
        <Button color='secondary' text='Delete' disabled={add} click={deleteHandler}/>
        </form>
    </Paper>
    )
}