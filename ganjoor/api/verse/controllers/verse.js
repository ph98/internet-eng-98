'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
	/**
	 * Retrieve records.
	 *
	 * @return {Array}
	 */

	async find(ctx) {
		let entities;
		if (ctx.query._q) {
			entities = await strapi.services.verse.search(ctx.query);
		} else {
			entities = await strapi.services.verse.find(ctx.query);
		}

		return entities.map(entity =>
			{
				console.log(entity)
				return sanitizeEntity(entity, { model: strapi.models.verse })
			}
		);
	},

	// async findOne(ctx) {
	// 	const entity = await strapi.services.verse.findOne(ctx.params);
	// 	// entity.comments[0].name = 'sajjad'
	// 	// console.log(entity.comments[0].user.name)
	// 	entity = entity.comments.map(item=>{ 
	// 		const temp = strapi.services.user.findOne({id :item.user })
	// 		console.log(temp)
	// 	})
	// 	return sanitizeEntity(entity, { model: strapi.models.verse });
	//   },
};
