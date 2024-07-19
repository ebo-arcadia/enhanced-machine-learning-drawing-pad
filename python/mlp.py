from functions import readFeatureFile
from sklearn.neural_network import MLPClassifier

hidden = (10)

mlp = MLPClassifier (
    hidden,
    max_iter=10000,
    random_state=1,
    activation = 'tanh'
)

X, y = readFeatureFile("/Users/ebolee/repo/enhanced-machine-learning-drawing-pad/data/dataset/training.csv")


mlp.fit(X, y)

X, y = readFeatureFile("/Users/ebolee/repo/enhanced-machine-learning-drawing-pad/data/dataset/testing.csv")

accuracy = mlp.score(X, y)
print("Accuracy:", accuracy)

classes = [
    "car", "fish", "house", "tree", "bicycle", "guitar", "pencil", "clock"
]

jsonObj = {
    "neuronCounts": [len(X[0]), hidden, len(classes)],
    "classes": classes,
    "network": {
        "levels": []
    }
}

for i in range(0, len(mlp.coefs_)):
    level = {
        "weights": mlp.coefs_[i].tolist(),
        "biases": mlp.intercepts_[i].tolist(),
        "inputs": [0]*len(mlp.coefs_[i]),
        "outputs": [0]*len(mlp.intercepts_[i])
    }
    
    jsonObj["network"]["levels"].append(level)


import json
json_object = json.dumps(jsonObj, indent=2)

with open("/Users/ebolee/repo/enhanced-machine-learning-drawing-pad/data/models/model.json", "w") as outfile:
    outfile.write(json_object)
with open("/Users/ebolee/repo/enhanced-machine-learning-drawing-pad/common/js_objects/model.js", "w") as outfile:
    outfile.write("const model = "+json_object+";")
