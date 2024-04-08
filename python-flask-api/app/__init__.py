from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy, BaseQuery
from .helpers import jsonmultidict as json2dict
from .helpers.json_encoder import CustomJSONEncoder

from flask_mail import Mail
from flask_cors import CORS

import flask_excel as excel

app = Flask(__name__)
       
# Load the configuration from the instance folder
app.config.from_pyfile('config.py')
app.url_map.strict_slashes = False
CORS(app)  # This will enable CORS for all routes


db = SQLAlchemy(app)  # init database
mail = Mail(app)  # init mail client
excel.init_excel(app)  # init flask_excel


from .helpers.http_errors import InternalServerError, BadRequest, Unauthorized

# Handle app exceptions
# Return 500 Internal Server Error
@app.errorhandler(500)
def server_error(error):
    msg = str(error)
    if not app.config['DEBUG']:
        msg = "Error processing request..."
    return InternalServerError(msg)


def resolve_request_body():
    # Before every request, resolve `request.body` from `request.get_json()`
    if request.method == 'POST' or request.method == 'PUT':
        body = request.get_json()
        if body:
            if isinstance(body, list):
                allpost = []
                for post in body:
                    allpost.append(json2dict.get_json_multidict(post))
                request.body = allpost
            else:
                request.body = json2dict.get_json_multidict(body)
        else:
            request.body = json2dict.get_json_multidict(request.form)

app.before_request(resolve_request_body)
app.json_encoder = CustomJSONEncoder



from .controllers.home import  Home_blueprint
from .controllers.components_data import  Components_Data_blueprint
from .controllers.fileuploader import File_Uploader_blueprint
from .controllers.assignments import Assignments_blueprint
from .controllers.classes import Classes_blueprint
from .controllers.marks import Marks_blueprint
from .controllers.students import Students_blueprint
from .controllers.subjects import Subjects_blueprint
from .controllers.teachers import Teachers_blueprint


# Page controller blueprint
app.register_blueprint(Home_blueprint, url_prefix = "/api/home")
app.register_blueprint(Components_Data_blueprint, url_prefix = "/api/components_data")
app.register_blueprint(File_Uploader_blueprint, url_prefix = "/api/fileuploader")
app.register_blueprint(Assignments_blueprint, url_prefix = "/api/assignments")
app.register_blueprint(Classes_blueprint, url_prefix = "/api/classes")
app.register_blueprint(Marks_blueprint, url_prefix = "/api/marks")
app.register_blueprint(Students_blueprint, url_prefix = "/api/students")
app.register_blueprint(Subjects_blueprint, url_prefix = "/api/subjects")
app.register_blueprint(Teachers_blueprint, url_prefix = "/api/teachers")