
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Form2Marks extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				year: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				term: { type:Sequelize.STRING   },
				form: { type:Sequelize.STRING   },
				math: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				eng: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				kis: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				chem: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				phy: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				bio: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				geo: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				hist: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				cre: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				bus: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				fullname: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				comp: { type:Sequelize.INTEGER   },
				total: { type:Sequelize.INTEGER   },
				average: { type:Sequelize.INTEGER   }
			}, 
			{ 
				sequelize,
				
				tableName: "form_2_marks",
				modelName: "form_2_marks",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'year', 
			'term', 
			'form', 
			'math', 
			'eng', 
			'kis', 
			'chem', 
			'phy', 
			'bio', 
			'geo', 
			'hist', 
			'cre', 
			'bus', 
			'fullname', 
			'comp', 
			'total', 
			'average'
		];
	}

	static viewFields() {
		return [
			'id', 
			'year', 
			'term', 
			'form', 
			'math', 
			'eng', 
			'kis', 
			'chem', 
			'phy', 
			'bio', 
			'geo', 
			'hist', 
			'cre', 
			'bus', 
			'fullname', 
			'comp', 
			'total', 
			'average'
		];
	}

	static editFields() {
		return [
			'id', 
			'year', 
			'term', 
			'form', 
			'math', 
			'eng', 
			'kis', 
			'chem', 
			'phy', 
			'bio', 
			'geo', 
			'hist', 
			'cre', 
			'bus', 
			'fullname', 
			'comp', 
			'total', 
			'average'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("term LIKE :search"), 
			Sequelize.literal("form LIKE :search"), 
			Sequelize.literal("fullname LIKE :search"),
		];
	}

	
	
}
Form2Marks.init();
export default Form2Marks;
