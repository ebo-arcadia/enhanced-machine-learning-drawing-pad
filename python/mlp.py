from functions import readFeatureFile
from sklearn.neural_network import MLPClassifier

hidden = (10)

mlp = MLPClassifier (
    hidden,
    max_iter=10000,
    random_state=1
)

X, y = readFeatureFile("/Users/ebolee/repo/enhanced-machine-learning-drawing-pad/data/dataset/training.csv")


mlp.fit(X, y)

X, y = readFeatureFile("/Users/ebolee/repo/enhanced-machine-learning-drawing-pad/data/dataset/testing.csv")

accuracy = mlp.score(X, y)
print("Accuracy:", accuracy)

print(mlp.intercepts_)
print(mlp.coefs_)
