import React, { Component } from 'react';
import './ChildNode.css';

export class ChildNode extends Component {
	render() {
		const { data, isOpen } = this.props;
		const childNodeClass = isOpen ? 'active' : 'nested';
		return (
			<ul className={childNodeClass}>
				{data?.map((node) => (
					<li key={node?.id}>{node?.title}</li>
				))}
			</ul>
		);
	}
}
