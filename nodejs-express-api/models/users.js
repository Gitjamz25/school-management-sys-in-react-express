
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Users extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				username: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				password: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				email: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				photo: { type:Sequelize.STRING   },
				user_role_id: { type:Sequelize.INTEGER   }
			}, 
			{ 
				sequelize,
				
				tableName: "users",
				modelName: "users",
			}
		);
	}
	
	static listFields() {
		return [
			'username', 
			'email', 
			'photo', 
			'user_role_id', 
			'id'
		];
	}

	static viewFields() {
		return [
			'id', 
			'username', 
			'email', 
			'user_role_id'
		];
	}

	static accounteditFields() {
		return [
			'username', 
			'photo', 
			'id'
		];
	}

	static accountviewFields() {
		return [
			'id', 
			'username', 
			'email', 
			'user_role_id'
		];
	}

	static editFields() {
		return [
			'username', 
			'photo', 
			'user_role_id', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("username LIKE :search"), 
			Sequelize.literal("email LIKE :search"), 
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
Users.init();
export default Users;
