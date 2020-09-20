import React, { Suspense, lazy, Component } from 'react';
import './App.css';

const Tree = lazy(() => import('./components/Tree'));

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			treeData: {},
			isError: false,
			query: '',
			filterTreeData: {}
		};

		this.handleSearchChange = this.handleSearchChange.bind(this);
	}

	componentDidMount() {
		// Instead of loading data in one go we can have the infinite loading
		fetch('https://okrcentral.github.io/sample-okrs/db.json')
			.then((response) => response.json())
			.then((response) => {
				let rawData = response?.data;
				let data = {
					other: {
						children: []
					}
				};
				for (let node of rawData) {
					node.children = [];
					if (!node?.parent_objective_id) {
						data[node?.id] = node;
					} else {
						if (data[node?.parent_objective_id]?.children) {
							data[node.parent_objective_id].children.push(node);
						} else {
							data['other'].children.push(node);
						}
					}
				}

				this.setState({
					treeData: data,
					filterTreeData: data
				});
			})
			.catch((error) =>
				this.setState({
					isError: true
				})
			);
	}

	handleSearchChange(event) {
		// For better user experience we can use the debounce
		this.setState(
			{
				query: event?.target?.value ?? ''
			},
			() => {
				let filterTreeData = {};
				const { treeData, query } = this.state;
				for (let node in treeData) {
					if (treeData[node]?.category?.toLocaleLowerCase()?.includes(query?.toLocaleLowerCase())) {
						filterTreeData[node] = { ...treeData[node] };
					}
				}

				this.setState({
					filterTreeData: filterTreeData
				});
			}
		);
	}

	render() {
		const { isError, treeData, query, filterTreeData } = this.state;

		return (
			<div>
				<h1>React Tree</h1>
				{isError && <h3>Failed to load data</h3>}
				<label>Enter the category: </label>
				<input value={query} onChange={this.handleSearchChange} />
				<Suspense fallback={<div>Loading...</div>}>
					{!treeData && <div>Loading...</div>}
					{treeData && <Tree data={query ? filterTreeData : treeData}></Tree>}
				</Suspense>
			</div>
		);
	}
}

export default App;
