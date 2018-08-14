import React from 'react';
import Grid from '@material-ui/core/Grid';
import Form from './Layouts/Form';
import Table from './Layouts/Table';
import Bar from './Layouts/Bar';
import axios from 'axios';

const labels = ['Name','Username','Password','Phone','Mobile','Address'];

export default class Management extends React.Component{ 
    state = {
        api: {
            getLink: this.props.get,
            data: [],
        },
        selectedRow: null,
    }

    componentDidMount(){
        this.requestChecker();
    }

    selectedRowHandler = row => {
        this.setState({selectedRow: row});
    }
    
    requestChecker = () => {
        axios.get(this.state.api.getLink).then( response => {
            const api = Object.assign({}, this.state.api);
            api.data = response.data;
            this.setState({api: api});
            this.selectedRowHandler(null);
        })
    }

    render(){
        const data = this.state.api.data;
        const values = this.state.selectedRow;

        return (
            <Grid container>
                <Bar title='Employee Management API' color='primary' />
                <Grid container>
                    <Grid item xs={12} sm={12} md={5}>
                        <Form title='Management Form' values={values} check={this.requestChecker} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                        <Table labels={labels} data={data} selectFunc={this.selectedRowHandler} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }

}