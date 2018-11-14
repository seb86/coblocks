/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import icons from './../../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { compose, withState } = wp.compose;
const { Component, Fragment } = wp.element;
const { PlainText } = wp.editor;
const { Button } = wp.components;

/**
 * Block constants
 */
const SHOT_URL = 'https://s0.wordpress.com/mshots/v1/';

/**
 * Block edit function
 */
class Edit extends Component {

	constructor() {
		super( ...arguments );
		this.storeURL  = this.storeURL.bind( this );
		this.updateURL = this.updateURL.bind( this );
	}

	componentDidMount() {
		if ( this.props.attributes.url ) {
			this.props.setState( { preview: true } )
		}
	}

	storeURL( newURL ) {
		this.props.setState( { tempURL: newURL } );
	}

	updateURL() {
		const newURL = this.props.tempURL;

		this.props.setAttributes( { url: SHOT_URL + newURL + '?w=' + this.props.attributes.width + '&=h' + this.props.attributes.height } );

		if ( ! this.props.attributes.url ) {
			this.props.setState( { preview: true } )
		}
	}

	render() {

		const {
			attributes,
			className,
			tempURL,
			preview,
			setAttributes,
			setState,
		} = this.props;

		const {
			align,
			url,
			width,
			height,
		} = attributes;

		return [
			<Fragment>
				{ preview ? (
					url && (
						<div
							className={ classnames(
								className,
							) }
						>
							<img
								src={ url }
								width={ width } 
								height={ height }
							/>
						</div>
					)
				) : (
					<div
						className={ classnames(
							className,
							'wp-block-shortcode',
						) }
					>
						<label>
							{ icons.browser }
							{ __( 'Site Capture URL' ) }
						</label>
						<PlainText
							className="input-control"
							value={ url }
							placeholder={ __( 'Enter URL...' ) }
							onChange={ this.storeURL }
							title={ tempURL }
						/>
						<Button 
							isPrimary
							isLarge
							title={ __( 'Press to Capture Site Screenshot' ) }
							onClick={ this.updateURL }
						>
						{ __( 'Capture' ) }
						</Button>
					</div>
				) }
			</Fragment>
		];
	}
};

export default compose( [
	withState( {
		tempURL: '',
		preview: false
	} ),
] )( Edit );
