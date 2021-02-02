import React, {Component} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';

const styles = theme => ({
	flexContainer: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
	root :{
		width: 500,
		height: 500,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'stretch',
		marginTop: 80
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	table: {
		fontFamily: theme.typography.fontFamily,
		marginTop: '15',
	},
	flexContainer: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
	tableRow: {
		cursor: 'pointer',
	},
	tableRowHover: {
		'&:hover': {
			backgroundColor: theme.palette.grey[200],
		},
	},
	tableCell: {
		flex: 1,
	},
	noClick: {
		cursor: 'initial',
	},
});

class PropertyListingTable extends Component{
	getRowClassName = ({ index }) => {
		const { classes, rowClassName, onRowClick } = this.props;
		return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
			[classes.tableRowHover]: index !== -1 && onRowClick != null,
		});
	};

	complexDataGetter = ({dataKey, rowData}) => {
		return this.complexSplitter(dataKey, rowData);
	}
	
	complexSplitter (_dataKey, _rowData) {
		if(_dataKey === undefined || _rowData === undefined) return "";
		if(_dataKey.indexOf('.') != -1) {															//--- contains nested prop..
			let nestedKeys = _dataKey.split('.');												//--- split props..
			for (let c = 0; c < nestedKeys.length; c ++) {
				const currentKey = nestedKeys.splice(0, 1)[0];						//--- capture value of the nested prop...
				return this.complexSplitter(nestedKeys.join('.'), _rowData[currentKey]);	//--- return what is readable and expected...
			}
		}
		else {
			if (typeof _rowData[_dataKey] === 'function') {
				return _rowData();
			} else {
				return _rowData[_dataKey];
			}
		}
	}

	cellRenderer = ({ cellData, columnIndex = null }) => {
		const { columns, classes, rowHeight, onRowClick } = this.props;
		return (
			<TableCell component="div" variant="body" style={{ height: rowHeight }}
				className={classNames(classes.tableCell, classes.flexContainer, {
					[classes.noClick]: onRowClick == null,
				})}
				align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}>
				{cellData}
			</TableCell>
		);
	};

	headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
		const { headerHeight, columns, classes, sort } = this.props;
		const direction = {
			[SortDirection.ASC]: 'asc', [SortDirection.DESC]: 'desc',
		};

		const inner =
			!columns[columnIndex].disableSort && sort != null ? (
				<TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
					{label}
				</TableSortLabel>
			) : (
				label
			);

		return (
			<TableCell component="div" className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
				variant="head" style={{ height: headerHeight }} align={columns[columnIndex].numeric || false ? 'right' : 'left'} >
				{inner}
			</TableCell>
		);
	};

	render() {
		const { classes, columns, ...tableProps } = this.props;
		return (
			<div className={classes.flexContainer}>
				<AutoSizer>
					{({ height, width }) => (
						<Table className={classes.table} height={height} width={width} {...tableProps} rowClassName={this.getRowClassName}>
							{columns.map(({ cellContentRenderer = null, className, dataKey, ...other }, index) => {
								let renderer;
								if (cellContentRenderer != null) {
									renderer = cellRendererProps =>
										this.cellRenderer({ cellData: cellContentRenderer(cellRendererProps), columnIndex: index, });
								} else {
									renderer = this.cellRenderer;
								}

								return (
									<Column cellDataGetter={this.complexDataGetter} key={dataKey} className={classNames(classes.flexContainer, className)}
													cellRenderer={renderer} dataKey={dataKey} {...other} 
										headerRenderer={headerProps =>
											this.headerRenderer({ ...headerProps, columnIndex: index, })
										} />
								);
							})}
						</Table>
					)}
				</AutoSizer>
			</div>
		);
	}
}

PropertyListingTable.defaultProps = {
	headerHeight: 56,
	rowHeight: 56,
};

const WrappedPropertyListingTable = withStyles(styles)(PropertyListingTable);

class PropertyListing extends Component{
	componentDidMount(){
		this.props.getAllProperties();
	}

	render()
	{
		return (
			<Paper style={{ height: 400, width: '100%' }}>
				<WrappedPropertyListingTable
					rowCount={this.props.propertyList.length}
					rowGetter={({ index }) => this.props.propertyList[index]}
					onRowClick={event => console.log(event)}
					columns={[
						{
							width: 200,
							label: 'Name',
							dataKey: 'name',
						},
						{
							width: 150,
							//flexGrow: 1.0,
							label: 'Description',
							dataKey: 'description',
							numeric: false,
						},
						{
							width: 180,
							flexGrow: 1,
							label: 'Address',
							dataKey: 'address.addressLine1',
							//dataKey: 'address.addressLine1,address.addressLine2,address.city.name,address.state.name,address.country.name',
						},
						{
							width: 100,
							flexGrow: 1,
							label: 'Country',
							dataKey: 'address.country.name',
						},
						{
							width: 120,
							flexGrow: 1,
							label: 'State',
							dataKey: 'address.state.name',
						},
						{
							width: 120,
							flexGrow: 1,
							label: 'City',
							dataKey: 'address.city.name',
						},
						{
							width: 220,
							label: 'Property Group',
							dataKey: 'propertyGroup.name',
						},
					]}
				/>
			</Paper>
		);
	}
}

export default PropertyListing;