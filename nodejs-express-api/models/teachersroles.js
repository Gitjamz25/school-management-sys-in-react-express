
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class TeachersRoles extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, defaultValue: Sequelize.literal('DEFAULT') },
				teacher_name: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				role: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				date: { type:Sequelize.DATEONLY , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "teachers_roles",
				modelName: "teachers_roles",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'teacher_name', 
			'role', 
			'date'
		];
	}

	static viewFields() {
		return [
			'id', 
			'teacher_name', 
			'role', 
			'date'
		];
	}

	static editFields() {
		return [
			'teacher_name', 
			'role', 
			'date', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
TeachersRoles.init();
export default TeachersRoles;
