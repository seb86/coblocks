/**
 * WordPress dependencies
 */
const { registerBlockType } = wp.blocks;

// Register block category.
import icons from './utils/block-category';

// Category slug and title.
const category = {
	slug: 'coblocks',
	title: 'CoBlocks',
};

/**
 * Register Blocks
 */
import * as accordion from './blocks/accordion';
import * as accordionItem from './blocks/accordion-item';
import * as alert from './blocks/alert';
import * as author from './blocks/author';
import * as clickToTweet from './blocks/click-to-tweet';
import * as dynamicSeparator from './blocks/dynamic-separator';
import * as gif from './blocks/gif';
import * as gist from './blocks/gist';
import * as highlight from './blocks/highlight';
import * as pricingTable from './blocks/pricing-table';
import * as pricingTableItem from './blocks/pricing-table-item';
import * as siteCapture from './blocks/site-capture';
import * as social from './blocks/social';

export function registerBlocks () {
	[
		accordion,
		accordionItem,
		alert,
		author,
		clickToTweet,
		dynamicSeparator,
		gif,
		gist,
		highlight,
		pricingTable,
		pricingTableItem,
		siteCapture,
		social,
	].forEach( ( block ) => {

		if ( ! block ) {
			return;
		}

		const { name, settings } = block;

		registerBlockType( `coblocks/${ name }`, { category: category.slug, ...settings } );
	} );
};
registerBlocks();
