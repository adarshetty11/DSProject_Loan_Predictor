from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_dependents',methods=['GET'])
def get_dependents():
    response = jsonify({
        'dependents':util.get_dependents()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/get_property_area',methods=['GET'])
def get_property_area():
    response = jsonify({
        'properties':util.get_property_area()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/loan_prediction',methods=['GET','POST'])
def loan_prediction():
    
    gender = int(request.form['gender'])
    married = int(request.form['married'])
    education = int(request.form['education'])
    employment = int(request.form['self_employed'])
    applicantincome = float(request.form['applicantincome'])
    coapplicantincome = float(request.form['coapplicantincome'])
    loan_amount = float(request.form['loanamount'])
    loan_amount_term = float(request.form['loan_amount_term'])
    credit_history = int(request.form['credit_history'])
    dependents = request.form['dependents']
    properties = request.form['property_area']


    response = jsonify({
        'predict_loan':float(util.predict_loan(gender,married,education,employment,applicantincome,coapplicantincome,loan_amount,loan_amount_term,credit_history,dependents,properties))
    })

    response.headers.add('Access-Control-Allow-Origin','*')
    return response
    

if __name__ == "__main__":
    print("Starting python Flask Server for Loan Prediction")
    util.load_saved_artificats()
    app.run()