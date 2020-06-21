from flask import Flask, abort, request
from flair.models import TextClassifier
from flair.data import Sentence
from flask import render_template

app = Flask(__name__)

@app.route("/", methods=['POST', 'GET'])
def sentimentAnalysis():
	if request.method == 'POST':
		classifier = TextClassifier.load('en-sentiment')
		inputQuery = request.form['query']
		sentence = Sentence(inputQuery)
		classifier.predict(sentence)
		print('Sentiment: ', sentence.labels)
		label = sentence.labels[0]
		labscore = (label.score)*100
		response = {'result': label.value, 'score': "%.2f" % labscore}
		return render_template('index.html', query=inputQuery, output=response)
	else:
		return render_template('index.html') 