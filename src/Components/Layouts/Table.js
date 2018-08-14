import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class TableComponent extends React.Component{
    state = {
        style: {
            paper: {
                color: 'white',
                margin: '10px',
                overflowY: 'auto',
                overflowX: 'auto',
                
            },
            table:{
                overflowX: 'scroll',
            },
            tableHeadCell: {
                color: 'white',
                fontSize: 18
            },
            tableBodyCell:{
                color: 'black',
                fontSize: 16
            },
            tableHead: {
                backgroundColor: 'blue',
            },
            selectedRow: {
                backgroundColor: 'paleturquoise',
                borderLeft: '3px solid blue',
            },
            selectedCell: {
                fontWeight: 'bold',
                fontSize: 16
            }
        },
        selected: -1,
    }

    rowClickHandle(id){
        const data = [...this.props.data]; // Copy the data list
        const lastSelected = this.state.selected; // Get last selected item
        const index = data.findIndex(emp => emp.id === id); // Get index of current item
        const clicked = data[index].clicked;    // Get click state
        
        data[index].clicked = !clicked; // Invert click state
        this.setState({data: data});    // Update data list

        // Check if there was a selected item, and it's not current item; to uncheck it.
        if(lastSelected >= 0 && lastSelected !== index)
            data[lastSelected].clicked = false; // Remove last selection

        if(!clicked){
            this.setState({selected: index});
            this.props.selectFunc(this.getSelectedRow(index));
        }

        if(lastSelected >= 0 && lastSelected === index){
            this.setState({selected: -1});  // Set last selected to -1 if no one selected.
            this.props.selectFunc(this.getSelectedRow(-1));
        }

    }

    getSelectedRow(index){
        if(index === -1) return index;
        const data = [...this.props.data]; // Copy the data list
        return data[index];
    }

    render(){ 
        const selectedStyle = this.state.style.selectedCell;
        const cellStyle = this.state.style.tableBodyCell;

        const tableData = this.props.data.map( item => 
            <TableRow key={item.id} onClick={(event) => this.rowClickHandle(item.id)} hover={true}
            style={item.clicked ? this.state.style.selectedRow : null}>
                <TableCell component="th" scope="row" style={item.clicked ? selectedStyle : cellStyle}>{item.name}</TableCell>
                <TableCell numeric style={item.clicked ? selectedStyle : cellStyle}>{item['userName']}</TableCell> 
                <TableCell numeric style={item.clicked ? selectedStyle : cellStyle}>{item['password']}</TableCell> 
                <TableCell numeric style={item.clicked ? selectedStyle : cellStyle}>{item['telephone']}</TableCell> 
                <TableCell numeric style={item.clicked ? selectedStyle : cellStyle}>{item['mobile']}</TableCell> 
                <TableCell numeric style={item.clicked ? selectedStyle : cellStyle}>{item['address']}</TableCell> 
            </TableRow>
        )

        return (
        <Paper style={this.state.style.paper}>
            <Table >
                <TableHead style={this.state.style.tableHead}>
                <TableRow>
                    {this.props.labels.map(label => 
                        <TableCell style={this.state.style.tableHeadCell} key={label}>{label}</TableCell>
                    )}
                </TableRow>

                </TableHead>
                <TableBody>
                    {tableData}
                </TableBody>
            </Table>
        </Paper>
        )
    }
}



    /* render table items dynamically 
        {Object.keys(item).slice(2,6).map(cell => 
            <TableCell numeric style={item.clicked ? this.state.style.selectedCell : null}>
                {item[cell]}
            </TableCell>    
        )}
    */