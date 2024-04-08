
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Assignments extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				year: { type:Sequelize.STRING   },
				term: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				subject: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				asignment_name: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				file: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				instructions: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "assignments",
				modelName: "assignments",
			}
		);
	}
	
	static listFields() {
		return [
			'year', 
			'term', 
			'subject', 
			'asignment_name', 
			'id'
		];
	}

	static viewFields() {
		return [
			'year', 
			'term', 
			'subject', 
			'asignment_name', 
			'file', 
			'instructions', 
			'id'
		];
	}

	static editFields() {
		return [
			'year', 
			'term', 
			'subject', 
			'asignment_name', 
			'file', 
			'instructions', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("year LIKE :search"), 
			Sequelize.literal("term LIKE :search"), 
			Sequelize.literal("subject LIKE :search"), 
			Sequelize.literal("asignment_name LIKE :search"), 
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("instructions LIKE :search"),
		];
	}

	
	
}
Assignments.init();
export default Assignments;
