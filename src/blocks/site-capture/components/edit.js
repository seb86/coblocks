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
const { Button, Spinner } = wp.components;

/**
 * Block constants
 */
const API_URL = 'https://s0.wordpress.com/mshots/v1/';

const DEFAULT_URL = API_URL + 'default';

/**
 * Block edit function
 */
class Edit extends Component {

	constructor() {
		super( ...arguments );
		this.storeURL       = this.storeURL.bind( this );
		this.displayCapture = this.displayCapture.bind( this );
	}

	componentDidMount() {
		if ( this.props.attributes.url ) {
			this.props.setState( { preview: true } )
		}
	}

	componentWillMount() {
		// Delay the reload for 2 seconds to give WordPress.com a chance to generate a screenshot.
		this.displayScreenshot = _.debounce( function() {
			// If the image has been captured then display screenshot.
			if ( this.props.attributes.url ) {
				this.props.setState( { captured: true } );
			}
		}, 2000 );
	}

	// Store the site URL we are capturing.
	storeURL( newURL ) {
		this.props.setState( { tempURL: newURL } );
	}

	// Refresh the image once requested the screenshot capture.
	displayCapture() {
		this.displayScreenshot();
	}

	render() {

		const {
			attributes,
			className,
			tempURL,
			captured,
			fetching,
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

		var captureURL = _.debounce( function captureURL() {
			if ( fetching ) {
				return;
			}

			setState( { fetching: true } );

			const CAPTURE_URL = API_URL + encodeURI( tempURL + '?w=' + attributes.width + '&=h' + attributes.height );

			fetch ( CAPTURE_URL, {
				method: 'GET',
				headers: {
					'Access-Control-Allow-Origin':'*',
					'Content-Type':'image/jpeg'
				}
			}).then( response => {
				if ( response.ok ) {
					setAttributes( { url: response } );
				}
			});

			if ( attributes.url ) {
				setState( { fetching: false } );
				setState( { preview: true } );
			}
		}, 1000 );

		// If we are fetching a screenshot then lets show a spinner.
		var showSpinner;

		if ( fetching ) {
			showSpinner = <Spinner/>;
		}

		return [
			<Fragment>
				{ preview ? (
					url && (
						<div
							className={ classnames(
								className,
							) }
						>
							{ captured ? (
								<img
									src={ captured }
									width={ width } 
									height={ height }
								/>
							) : (
								<img
									src={ DEFAULT_URL }
									width={ width } 
									height={ height }
									onLoad={ this.displayCapture() }
								/>
							) }
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
							onClick={ ( event ) => captureURL( event.target.value ) }
						>
						{ __( 'Capture' ) }
						</Button>
						{ showSpinner }
					</div>
				) }
			</Fragment>
		];
	}
};

export default compose( [
	withState( {
		tempURL: '',
		captured: false,
		fetching: false,
		preview: false
	} ),
] )( Edit );
