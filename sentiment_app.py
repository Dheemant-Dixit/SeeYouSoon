import numpy as np
import tensorflow as tf
from tensorflow import keras
import nltk
from transformers import BertTokenizerFast
from transformers import TFBertModel
import snscrape.modules.twitter as sntwitter
import re, string
import demoji
from flask import Flask, jsonify, request

app = Flask(__name__)
MAX_LEN=128
tokenizer = BertTokenizerFast.from_pretrained('bert-base-uncased')
bert_model = TFBertModel.from_pretrained('bert-base-uncased')

def create_model(bert_model, max_len=MAX_LEN):
    
    opt = tf.keras.optimizers.Adam(learning_rate=1e-5, decay=1e-7)
    loss = tf.keras.losses.CategoricalCrossentropy()
    accuracy = tf.keras.metrics.CategoricalAccuracy()


    input_ids = tf.keras.Input(shape=(max_len,),dtype='int32')
    
    attention_masks = tf.keras.Input(shape=(max_len,),dtype='int32')
    
    embeddings = bert_model([input_ids,attention_masks])[1]
    
    output = tf.keras.layers.Dense(3, activation="softmax")(embeddings)
    
    model = tf.keras.models.Model(inputs = [input_ids,attention_masks], outputs = output)
    
    model.compile(opt, loss=loss, metrics=accuracy)
    
    return model

model = create_model(bert_model, MAX_LEN)
model.load_weights("model.hdf5")

def tokenize(data) :
    input_ids = []
    attention_masks = []
    for i in range(len(data)):
        encoded = tokenizer.encode_plus(
            data[i],
            add_special_tokens=True,
            max_length=128,
            padding='max_length',
            return_attention_mask=True
        )
        input_ids.append(encoded['input_ids'])
        attention_masks.append(encoded['attention_mask'])
    return np.array(input_ids),np.array(attention_masks)


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
    test_input_ids, test_attention_masks = tokenize(body, MAX_LEN)
    score = model.predict(test_input_ids, test_attention_masks)
    print(score)
    
    return score[0]


@app.route("/")
def hello_world():
    return "Hi bhai"


@app.route('/predict', methods=['POST'])
def predict():
    error = ''
    if request.method == 'POST':
        print(request)
        print(request.form.values)
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