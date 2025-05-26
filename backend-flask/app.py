from flask import Flask,jsonify,request

app=Flask(__name__)

@app.route('/')

def  home():
    return jsonify({"message":"crop disease detector is enabled"})

@app.route('/predict',methods=['POST'])

def predict():
    data=request.json
    # example placeholder logic
    return jsonify({
        "leaf msg received":data.get('image_base64'),
        "diseases detected":"Blight", #replace it later with actual data model
        "treatment":"use copper-based fungicide"
    })

if __name__=='__main__':
    app.run(debug=True,port=5001)