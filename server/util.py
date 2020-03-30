import json
import pickle 
import numpy as np

__data_columns = None
__dependents = None
__property = None
__model = None

def predict_loan(gender,married,education,employment,applicantincome,coapplicantincome,loan_amount,loan_amount_term,credit_history,dependents,properties):
    try:
        dependents_index = __data_columns.index(dependents.lower())
        property_index = __data_columns.index(properties.lower())
    except:
        dependents_index = -1
        property_index = -1
    x = np.zeros(len(__data_columns))
    x[0] = gender
    x[1] = married
    x[2] = education
    x[3] = employment
    x[4] = applicantincome
    x[5] = coapplicantincome
    x[6] = loan_amount
    x[7] = loan_amount_term
    x[8] = credit_history
    if dependents_index >= 0:
        x[dependents_index] = 1
    if property_index >= 0:
        x[property_index] = 1
    return (__model.predict([x])[0])


def get_data_columns():
    return __data_columns

def get_dependents():
    return __dependents

def get_property_area():
    return __property

def load_saved_artificats():
    print("Loading saved arificats....start")
    global __data_columns
    global __model
    global __dependents
    global __property
    with open("./artifacts/columns.json","r") as f:
        __data_columns = json.load(f)['data_columns']
        __dependents = __data_columns[9:12]
        __property = __data_columns[12:]    
    with open("./artifacts/loan_predictor.pickle","rb") as f:
        __model = pickle.load(f)
    print("Loading artificats....done")


if __name__ == "__main__":
    load_saved_artificats()
    print(get_data_columns())
    print(predict_loan(0,0,0,0,1000,1000,100000,100,1,'dependents_0','Rural'))