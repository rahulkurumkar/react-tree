import React, { Component, Suspense, lazy } from 'react';
import './TreeNode.css';

const ChildNode = lazy(() => import('./../ChildNode'));

export class TreeNode extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: true
		};

		this.onNodeClick = this.onNodeClick.bind(this);
	}

	onNodeClick() {
		this.setState((prevState) => ({ isOpen: !prevState?.isOpen }));
	}

	render() {
		const { data } = this.props;
		const { isOpen } = this.state;
		const nodeClass = isOpen ? 'caret caret-down' : 'caret';

		return (
			<li>
				<span className={nodeClass} onClick={this.onNodeClick}>
					{data?.title ?? 'Other Nodes'}
				</span>
				{data?.children?.length > 0 && (
					<Suspense fallback={<div>Loading node...</div>}>
						<ChildNode data={data.children} isOpen={isOpen}></ChildNode>
					</Suspense>
				)}
			</li>
		);
	}
}
