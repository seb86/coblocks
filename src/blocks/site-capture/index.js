/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import Edit from './components/edit';
import icons from './../../utils/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

/**
 * Block constants
 */
const name = 'site-capture';

const title = __( 'Site Capture' );

const icon = icons.browser;

const keywords = [
	__( 'screenshot' ),
	__( 'capture' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	url: {
		type: 'string',
	},
	align: {
		type: 'string',
	},
	height: {
		type: 'number',
		default: 450,
	},
	width: {
		type: 'number',
		default: 600,
	},
};

const settings = {
	title: title,

	description: __( 'Display a screenshot of a webpage.' ),

	icon: {
		src: icon,
	},

	keywords: keywords,

	attributes: blockAttributes,

	supports: {
		align: [ 'left', 'center', 'right' ],
	},

	edit: Edit,

	save() {
		return null;
	},
};

export { name, title, icon, settings };
