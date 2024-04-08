
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Teachers extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				fullname: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				dob: { type:Sequelize.DATEONLY , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				gender: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				phone: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') }
			}, 
			{ 
				sequelize,
				
				tableName: "teachers",
				modelName: "teachers",
			}
		);
	}
	
	static listFields() {
		return [
			'fullname', 
			'dob', 
			'gender', 
			'phone', 
			'email', 
			'id'
		];
	}

	static viewFields() {
		return [
			'id', 
			'fullname', 
			'dob', 
			'gender', 
			'phone', 
			'email'
		];
	}

	static editFields() {
		return [
			'fullname', 
			'dob', 
			'gender', 
			'phone', 
			'email', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("fullname LIKE :search"), 
			Sequelize.literal("gender LIKE :search"), 
			Sequelize.literal("phone LIKE :search"), 
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
Teachers.init();
export default Teachers;
