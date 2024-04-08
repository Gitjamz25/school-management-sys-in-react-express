
import { BaseModel, sequelize, Sequelize } from "./basemodel.js";

class Audits extends BaseModel {
	static init() {
		return super.init(
			{
				
				log_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
				action: { type:Sequelize.STRING   },
				page: { type:Sequelize.STRING   },
				record_id: { type:Sequelize.STRING   },
				user_id: { type:Sequelize.STRING   },
				user_ip: { type:Sequelize.STRING   },
				user_agent: { type:Sequelize.STRING   },
				request_url: { type:Sequelize.STRING   },
				old_values: { type:Sequelize.STRING   },
				new_values: { type:Sequelize.STRING   },
				timestamp: { type:Sequelize.DATE   }
			}, 
			{ 
				sequelize,
				
				tableName: "audits",
				modelName: "audits",
			}
		);
	}
	
	static listFields() {
		return [
			'log_id', 
			'action', 
			'page', 
			'record_id', 
			'user_id', 
			'user_ip', 
			'user_agent', 
			'request_url', 
			'old_values', 
			'new_values', 
			'timestamp'
		];
	}

	static viewFields() {
		return [
			'log_id', 
			'action', 
			'page', 
			'record_id', 
			'user_id', 
			'user_ip', 
			'user_agent', 
			'request_url', 
			'old_values', 
			'new_values', 
			'timestamp'
		];
	}

	
	static searchFields(){
		return [
			Sequelize.literal("log_id LIKE :search"), 
			Sequelize.literal("action LIKE :search"), 
			Sequelize.literal("page LIKE :search"), 
			Sequelize.literal("record_id LIKE :search"), 
			Sequelize.literal("user_id LIKE :search"), 
			Sequelize.literal("user_ip LIKE :search"), 
			Sequelize.literal("user_agent LIKE :search"), 
			Sequelize.literal("request_url LIKE :search"), 
			Sequelize.literal("old_values LIKE :search"), 
			Sequelize.literal("new_values LIKE :search"),
		];
	}

	
	
}
Audits.init();
export default Audits;
