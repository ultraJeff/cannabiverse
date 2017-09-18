/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		// { label: 'Research', key: 'research', href: '/blog/research/' },
		// { label: 'Innovation', key: 'innovation', href: '/blog/innovation/' },
		// { label: 'News', key: 'news', href: '/blog/news/' },
		// { label: 'Culture', key: 'culture', href: '/blog/culture/' },
		// { label: 'Education', key: 'education', href: '/blog/education/' },
		{ label: 'Witness Videos', key: 'witness-videos', href: 'http://godsgreenery.com/' },
		{ label: 'The Word', key: 'the-word', href: 'http://stories.christiansforcbd.com/' },
		{ label: 'What is CBD?', key: 'about-cbd', href: 'http://godsgreenery.com/blog/2017/08/08/httpchristiansforcbd-comblog20170619what-are-cbds/' },
		{ label: 'Finder', key: 'finder-map', href: '/map' }
	];
	res.locals.cbdTypes = [
		{ label: 'CBD for Cancer', key: 'research', href: '#' },
		{ label: 'CBD for PTSD', key: 'innovation', href: '#' },
		{ label: 'CBD for Pain', key: 'news', href: '#' },
		{ label: 'CBD for Epilepsy', key: 'culture', href: '#' },
		{ label: 'CBD for Autism', key: 'education', href: '#' },
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
