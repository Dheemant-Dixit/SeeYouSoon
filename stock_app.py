import numpy as np
import datetime
import snscrape.modules.twitter as sntwitter
import re, string
import demoji
from flask import Flask, jsonify, request

app = Flask(__name__)

def sigmoid(x):
    return 1/(1+np.exp(-x))

#Clean emojis from text
def strip_emoji(text):
    return demoji.replace(text, '') #remove emoji

#Remove punctuations, links, mentions and \r\n new line characters
def strip_all_entities(text): 
    text = text.replace('\r', '').replace('\n', ' ').replace('\n', ' ').lower() #remove \n and \r and lowercase
    text = re.sub(r"(?:\@|https?\://)\S+", "", text) #remove links and mentions
    text = re.sub(r'[^\x00-\x7f]',r'', text) #remove non utf8/ascii characters such as '\x9a\x91\x97\x9a\x97'
    banned_list= string.punctuation + 'Ã'+'±'+'ã'+'¼'+'â'+'»'+'§'
    table = str.maketrans('', '', banned_list)
    text = text.translate(table)
    return text

#clean hashtags at the end of the sentence, and keep those in the middle of the sentence by removing just the # symbol
def clean_hashtags(tweet):
    new_tweet = " ".join(word.strip() for word in re.split('#(?!(?:hashtag)\b)[\w-]+(?=(?:\s+#[\w-]+)*\s*$)', tweet)) #remove last hashtags
    new_tweet2 = " ".join(word.strip() for word in re.split('#|_', new_tweet)) #remove hashtags symbol from words in the middle of the sentence
    return new_tweet2

#Filter special characters such as & and $ present in some words
def filter_chars(a):
    sent = []
    for word in a.split(' '):
        if ('$' in word) | ('&' in word):
            sent.append('')
        else:
            sent.append(word)
    return ' '.join(sent)

def remove_mult_spaces(text): # remove multiple spaces
    return re.sub("\s\s+" , " ", text)


def fetcher(comp, start, end):
    query = f'${comp} until:{end} since:{start}'
    lis = []
    limit = 50
    for tweet in sntwitter.TwitterSearchScraper(query).get_items():
        if len(lis) == limit:
            break
        else:
            try:
                if tweet.lang == 'en' and tweet.cashtags == [comp] and tweet.likeCount >= 1:
                    lis.append([start,tweet.rawContent,tweet.likeCount])
            except:
                pass
    return lis

def getSentiment(body):
    from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
    analyzer = SentimentIntensityAnalyzer()
    
    assert body is not None
    vs = analyzer.polarity_scores(body)
    score = vs['compound']
    
    return score


@app.route("/")
def hello_world():
    return "Hi bhai"


@app.route('/predict', methods=['POST'])
def predict():
    error = ''
    if request.method == 'POST':
        sym = request.form['stock-symbol']
        since = request.form['start-date']
        upto = request.form['end-date']
        if sym:
            lis = fetcher(sym, since, upto)
            den = 0
            num = 0
            for tweet in lis:
                prob_result = getSentiment(remove_mult_spaces(filter_chars(clean_hashtags(strip_all_entities(strip_emoji(tweet[1]))))))
                num += prob_result*tweet[2]
                den += tweet[2]
            prob = num/den
            predictions = {
                "Result": prob*10
                }
        else:
            error = "Please upload images of jpg , jpeg and png extension only"
        
        if(len(error) == 0):
            return  jsonify(predictions)
        else:
            return error

if __name__=='__main__':
    app.debug = True
    app.run()