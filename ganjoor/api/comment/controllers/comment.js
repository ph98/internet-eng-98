'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	async create(ctx) {
		let entity;
		if (ctx.is('multipart')) {
		  const { data, files } = parseMultipartData(ctx);
		  entity = await strapi.services.comment.create(data, { files });
		} else {
			console.log(1, ctx.state.user)
			const newData = {...ctx.request.body, user: ctx.state.user.id, username: ctx.state.user.username}
		  	entity = await strapi.services.comment.create(newData);
		}
		console.log('here', entity)
		return sanitizeEntity(entity, { model: strapi.models.comment });
	  },

};
