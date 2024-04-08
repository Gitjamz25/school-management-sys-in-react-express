
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Form1Marks extends BaseModel {
	static init() {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				year: { type:Sequelize.INTEGER   },
				term: { type:Sequelize.STRING   },
				form: { type:Sequelize.STRING   },
				math: { type:Sequelize.INTEGER   },
				eng: { type:Sequelize.INTEGER   },
				kis: { type:Sequelize.INTEGER   },
				chem: { type:Sequelize.INTEGER   },
				phy: { type:Sequelize.INTEGER   },
				bio: { type:Sequelize.INTEGER   },
				geo: { type:Sequelize.INTEGER   },
				hist: { type:Sequelize.INTEGER   },
				cre: { type:Sequelize.INTEGER   },
				bus: { type:Sequelize.INTEGER   },
				fullname: { type:Sequelize.STRING   },
				comp: { type:Sequelize.INTEGER   },
				total: { type:Sequelize.INTEGER   },
				average: { type:Sequelize.INTEGER   }
			}, 
			{ 
				sequelize,
				
				tableName: "form_1_marks",
				modelName: "form_1_marks",
			}
		);
	}
	
	static listFields() {
		return [
			'id', 
			'fullname', 
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
			'comp', 
			'total', 
			'average'
		];
	}

	static exportListFields() {
		return [
			'id', 
			'fullname', 
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

	static exportViewFields() {
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
			'year', 
			'term', 
			'fullname', 
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
			'comp', 
			'total', 
			'average', 
			'id'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("id LIKE :search"), 
			Sequelize.literal("fullname LIKE :search"), 
			Sequelize.literal("term LIKE :search"), 
			Sequelize.literal("form LIKE :search"),
		];
	}

	
	
}
Form1Marks.init();
export default Form1Marks;
