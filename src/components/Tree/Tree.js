import React, { Component, Suspense, lazy } from 'react';
import './Tree.css';

const TreeNode = lazy(() => import('./TreeNode'));

export class Tree extends Component {
	renderTreeNode(data) {
		let NodeList = [];

		for (let node in data) {
			NodeList.push(<TreeNode key={data[node]?.id ?? 'other'} data={data[node]}></TreeNode>);
		}

		return NodeList;
	}

	render() {
		const { data } = this.props;

		return (
			<div>
				<ul className="tree-container">
					<Suspense fallback={<div>Loading...</div>}></Suspense>
					{this.renderTreeNode(data)}
				</ul>
			</div>
		);
	}
}
