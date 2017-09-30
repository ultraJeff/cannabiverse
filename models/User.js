var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User', {
	track: true,
	autokey: { path: 'key', from: 'id', unique: true }
});

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	resetPasswordKey: { type: String, hidden: true }
}, 'Profile', {
	isPublic: { type: Boolean, default: true },
	photo: { type: Types.CloudinaryImage },
	bio: { type: Types.Markdown }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	isVerified: { type: Boolean, label: 'Has a verified email address' }
}, 'Meta', {
	postCount: { type: Number, default: 0, noedit: true },
});

/**
 * Relationships
 */
User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });

/**
 * Virtuals
 * ========
 */
// Link to member
User.schema.virtual('url').get(function() {
	return '/member/' + this.key;
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});

// Pull out avatar image
User.schema.virtual('avatarUrl').get(function() {
	if (this.photo.exists) return this._.photo.thumbnail(120,120);
});

/**
 * Methods
 * =======
*/

User.schema.methods.resetPassword = function(callback) {
	var user = this;
	user.resetPasswordKey = keystone.utils.randomString([16,24]);
	user.save(function(err) {
		if (err) return callback(err);
		new keystone.Email('forgotten-password').send({
			user: user,
			link: '/reset-password/' + user.resetPasswordKey,
			subject: 'Reset your God\'s Greenery Password',
			to: user.email,
			from: {
				name: 'No Reply',
				email: 'no-reply@gods-greenery.com'
			}
		}, callback);
	});
}


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();

