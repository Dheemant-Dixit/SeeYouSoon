# StockPulse

StockPulse is a project that leverages natural language processing (NLP) and machine learning to determine the sentiment of tweets about a particular stock during a specified time period. It uses snscrape to scrape tweets, which are then passed through a pre-trained BERT model to get the embeddings. The embeddings are then passed through a fully connected neural network that provides a sentiment score.

## Features

Some of the features of the Stock Sentiment Analyzer include:

- Scraping tweets based on a specific keyword, hashtag, or user
- Analyzing tweets about a particular stock during a specified time period
- Providing a sentiment score for the analyzed tweets
- A user-friendly web interface to input the stock and time period for analysis
- Visualizations of the stock price and sentiment score trends over time
- And more!

## Sentiment Analysis

- BERT was fine tuned on tweets about some stocks for which we had some data regarding their opening price, closing price, etc.
- The embeddings which were provided by the BERT model was then passed through a FC Net to get a sentiment score.
- This sentiment score, for the past 10 days, was then passed through a LSTM to get the final sentiment score.

## Tech Stack

This web application is built using the following technologies:
- Node.js: A JavaScript runtime that allows us to run JavaScript code outside of a web browser.
- Express.js: A web application framework for Node.js that provides features for building web applications such as routing and middleware.
- MongoDB: A document-oriented NoSQL database that provides high scalability, availability, and performance.
- HTML/CSS/JavaScript: The standard web technologies used for building web pages and user interfaces.

## Prerequisites

To run this application on your local machine, you need to have the following software installed:
- Node.js (v12 or above)
- MongoDB (v4 or above)
