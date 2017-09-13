var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Carousel Model
 * =============
 */

var Carousel = new keystone.List('Carousel', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Carousel.add({
	name: { type: String, required: true },
	publishedDate: { type: Date, default: Date.now },
	images: { type: Types.CloudinaryImages },
	captions: { type: Types.TextArray }
});

Carousel.register();
