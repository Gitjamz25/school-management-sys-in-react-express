
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Marks extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				year: { type:Sequelize.STRING , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				term: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				uid: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				maths: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				english: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				kiswahili: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				chemistry: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				biology: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				physics: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				history: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				geography: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				cre: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				business: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				computer: { type:Sequelize.INTEGER , allowNull: false ,defaultValue: Sequelize.literal('DEFAULT') },
				form: { type:Sequelize.STRING   }
			}, 
			{ 
				sequelize,
				
				tableName: "marks",
				modelName: "marks",
			}
		);
	}
	
	static listFields() {
		return [
			Sequelize.literal('marks.year AS year'), 
			Sequelize.literal('marks.term AS term'), 
			Sequelize.literal('marks.form AS form'), 
			Sequelize.literal('marks.uid AS uid'), 
			Sequelize.literal('marks.maths AS maths'), 
			Sequelize.literal('marks.english AS english'), 
			Sequelize.literal('marks.kiswahili AS kiswahili'), 
			Sequelize.literal('marks.chemistry AS chemistry'), 
			Sequelize.literal('marks.biology AS biology'), 
			Sequelize.literal('marks.physics AS physics'), 
			Sequelize.literal('marks.history AS history'), 
			Sequelize.literal('marks.geography AS geography'), 
			Sequelize.literal('marks.cre AS cre'), 
			Sequelize.literal('marks.business AS business'), 
			Sequelize.literal('marks.computer AS computer'), 
			Sequelize.literal('marks.id AS id')
		];
	}

	static viewFields() {
		return [
			'id', 
			'year', 
			'term', 
			'uid', 
			'maths', 
			'english', 
			'kiswahili', 
			'chemistry', 
			'biology', 
			'physics', 
			'history', 
			'geography', 
			'cre', 
			'business', 
			'computer', 
			'form'
		];
	}

	static editFields() {
		return [
			'year', 
			'term', 
			'uid', 
			'form', 
			'maths', 
			'english', 
			'kiswahili', 
			'chemistry', 
			'biology', 
			'physics', 
			'history', 
			'geography', 
			'cre', 
			'business', 
			'computer', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("marks.year LIKE :search"), 
			Sequelize.literal("marks.form LIKE :search"), 
			Sequelize.literal("marks.uid LIKE :search"), 
			Sequelize.literal("marks.id LIKE :search"),
		];
	}

	
	
}
Marks.init();
export default Marks;
