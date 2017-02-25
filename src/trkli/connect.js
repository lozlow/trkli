import React, { Component } from 'react'
import trkl from 'trkl'

export default function connect (mapStateToProps) {
	return function (WrappedComponent) {
		return class ConnectedComponent extends Component {
			constructor (props) {
				super()
				this.propsObserver = trkl(props)
				this.computed = trkl.computed(() => mapStateToProps(this.propsObserver()))
				this.state = {
					props: this.computed()
				}
			}

			componentWillReceiveProps (nextProps) {
				this.propsObserver(nextProps)
			}

			componentWillMount () {
				this.computed.subscribe((newProps, oldProps) => {
					console.log('got new props', newProps, oldProps)
					this.setState({
						props: newProps
					})
				})
			}

			componentWillUnmount () {
				this.computed.unsubscribe()
			}

			render () {
				return <WrappedComponent {...this.props} {...this.state.props} />
			}
		}
	}
}
