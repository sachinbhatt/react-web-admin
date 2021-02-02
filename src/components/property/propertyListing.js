import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import { Paper, TableHead, TableRow, TableCell, Table, TableBody, TableFooter, TablePagination } from '@material-ui/core';

const styles = theme => ({
	root: {
		width: '70%',
		margin: 'auto',
		marginTop: theme.spacing.unit * 10,
		marginRight: theme.spacing.unit * 30,
	},
	table: {
		minWidth: 500,
	},
	tableCellHeder: {
		fontSize: '1.02rem',
		fontWeight: 400,
		color: 'white',
		align: 'left',
		backgroundColor: 'rgb(50, 150, 230)',
	},
	tableWrapper: {
		overflowX: 'auto',
	},
});

class PropertyListing extends Component{
	componentDidMount(){
		this.props.getAllProperties();
	}

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ page: 0, rowsPerPage: event.target.value });
	};
	
	rowGenerator () {
		return this.props.propertyList.map( row => {
		return row.propertyGroup && <TableRow key={row.id}>
			<TableCell component="td" scope="row">{row.name}</TableCell>
			<TableCell align="left">{row.description}</TableCell>
			<TableCell align="left">{row.address.addressLine1.concat(' ')
																.concat(row.address.addressLine1).concat(' ')
																.concat(row.address.city.name).concat(' ')
																.concat(row.address.state.name).concat(' ')
																.concat(row.address.country.name).concat(' ')}</TableCell>
			<TableCell align="left">{row.propertyGroup.name}</TableCell>
		</TableRow>})
	}

	render() {
		const { classes, leftPadding } = this.props;
		//const { rows, rowsPerPage, page } = this.state;
		//const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

		return (
			<Paper className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell className={classes.tableCellHeder}>Name</TableCell>
								<TableCell className={classes.tableCellHeder}>Description</TableCell>
								<TableCell className={classes.tableCellHeder}>Address</TableCell>
								<TableCell className={classes.tableCellHeder}>Group</TableCell>
						</TableRow>
						</TableHead>
						<TableBody>
							{this.rowGenerator()}
							{/* emptyRows > 0 && (
								<TableRow style={{ height: 48 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							) */}
						</TableBody>
					</Table>
				</div>
			</Paper>
		);
	}
}

export default PropertyListing = withStyles(styles, {withTheme: true})(PropertyListing);

/* --- Table pagination specific code --- */

{/* <TableFooter>
		<TableRow>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				colSpan={3}
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				SelectProps={{
					native: true,
				}}
				onChangePage={this.handleChangePage}
				onChangeRowsPerPage={this.handleChangeRowsPerPage}
				ActionsComponent={TablePaginationActionsWrapped}
		/>
	</TableRow>
</TableFooter> */}