
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Students extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				fullname: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				dob: { type:Sequelize.DATEONLY , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				gender: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				residence: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				phone: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				class: { type:Sequelize.STRING   }
			}, 
			{ 
				sequelize,
				
				tableName: "students",
				modelName: "students",
			}
		);
	}
	
	static listFields() {
		return [
			'fullname', 
			'gender', 
			'class', 
			'id'
		];
	}

	static viewFields() {
		return [
			'fullname', 
			'dob', 
			'gender', 
			'residence', 
			'phone', 
			'email', 
			'class', 
			'id'
		];
	}

	static editFields() {
		return [
			'fullname', 
			'dob', 
			'gender', 
			'residence', 
			'phone', 
			'email', 
			'class', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("fullname LIKE :search"), 
			Sequelize.literal("gender LIKE :search"), 
			Sequelize.literal("class LIKE :search"), 
			Sequelize.literal("residence LIKE :search"), 
			Sequelize.literal("phone LIKE :search"), 
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
Students.init();
export default Students;
