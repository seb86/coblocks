<?php
/**
 * Server-side rendering of the `coblocks/site-capture` block.
 *
 * @package @@pkg.title
 * @author  @@pkg.author
 * @license @@pkg.license
 */

/**
 * Renders the block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the block content.
 */
function coblocks_render_site_capture_block( $attributes ) {
	// Start the markup output.
	$markup = '';

	// Get screenshot.
	if ( ! empty( $attributes['url'] ) ) {	
		$markup .= '<img src="' . esc_url( $attributes['url'] ) . '" width="' . intval( $attributes['width'] ) . '" height="' . intval( $attributes['height'] ) . '" />';
	}

	$class     = 'wp-block-coblocks-site-capture';
	$alignment = is_array( $attributes ) && isset( $attributes['align'] ) ? "style=text-align:{$attributes['align']}" : false;

	// Render block content.
	$block_content = sprintf(
		'<div class="%1$s" %2$s><p>%3$s</p></div>',
		esc_attr( $class ),
		esc_attr( $alignment ),
		$markup
	);

	return $block_content;
}

/**
 * Registers the block on server.
 */
function coblocks_register_site_capture_block() {
	// Return early if this function does not exist.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type(
		'coblocks/site-capture', array(
			'editor_script'   => 'coblocks-editor',
			'editor_style'    => 'coblocks-editor',
			'style'           => 'coblocks-frontend',
			'attributes'      => array(
				'align'       => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'url'         => array(
					'type'    => 'string',
					'default' => null,
				),
				'height'      => array(
					'type'    => 'string',
					'default' => '450',
				),
				'width'       => array(
					'type'    => 'string',
					'default' => '600',
				),
			),
			'render_callback' => 'coblocks_render_site_capture_block',
		)
	);
}
add_action( 'init', 'coblocks_register_site_capture_block' );

