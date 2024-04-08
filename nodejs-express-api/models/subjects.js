
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Subjects extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				subject_name: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				hod: { type:Sequelize.STRING   }
			}, 
			{ 
				sequelize,
				
				tableName: "subjects",
				modelName: "subjects",
			}
		);
	}
	
	static listFields() {
		return [
			'subject_name', 
			'hod', 
			'id'
		];
	}

	static viewFields() {
		return [
			'id', 
			'subject_name', 
			'hod'
		];
	}

	static editFields() {
		return [
			'subject_name', 
			'hod', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("subject_name LIKE :search"), 
			Sequelize.literal("hod LIKE :search"), 
			Sequelize.literal("id LIKE :search"),
		];
	}

	
	
}
Subjects.init();
export default Subjects;
