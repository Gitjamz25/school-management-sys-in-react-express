
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Classes extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				class_name: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				class_teacher: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "classes",
				modelName: "classes",
			}
		);
	}
	
	static listFields() {
		return [
			'class_name', 
			'class_teacher', 
			'id'
		];
	}

	static viewFields() {
		return [
			'id', 
			'class_name', 
			'class_teacher'
		];
	}

	static editFields() {
		return [
			'class_name', 
			'class_teacher', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("class_name LIKE :search"), 
			Sequelize.literal("class_teacher LIKE :search"), 
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
Classes.init();
export default Classes;
