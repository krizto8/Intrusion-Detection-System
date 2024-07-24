from flask_socketio import SocketIO, emit
from flask import Flask, render_template, url_for, copy_current_request_context, request,jsonify
from flask_cors import CORS
from random import random
from time import sleep
from threading import Thread, Event

from scapy.sendrecv import sniff

#own modules
from Flow import Flow
from PacketInfo import PacketInfo

import numpy as np
import pickle
import csv 
import traceback

import json
import pandas as pd

# from models.AE import *

from scipy.stats import norm

import ipaddress
from urllib.request import urlopen

from tensorflow import keras

from lime import lime_tabular

import dill

import joblib

import plotly
import plotly.graph_objs
import sklearn
from sklearn.ensemble import RandomForestClassifier

import warnings
warnings.filterwarnings("ignore")

def ipInfo(addr=''):
    try:
        if addr == '':
            url = 'https://ipinfo.io/json'
        else:
            url = 'https://ipinfo.io/' + addr + '/json'
        res = urlopen(url)
        #response from url(if res==None then check connection)
        data = json.load(res)
        #will load the json response into data
        return data['country']
    except Exception:
        return None
__author__ = 'hoang'


app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'secret!'
app.config['DEBUG'] = True

#turn the flask app into a socketio app
socketio = SocketIO(app, async_mode=None, logger=True, engineio_logger=True,cors_allowed_origins="*")

#random result Generator Thread
thread = Thread()
thread_stop_event = Event()

cols = ['FlowID',
'FlowDuration',
'BwdPacketLenMax',
'BwdPacketLenMin',
'BwdPacketLenMean',
'BwdPacketLenStd',
'FlowIATMean',
'FlowIATStd',
'FlowIATMax',
'FlowIATMin',
'FwdIATTotal',
'FwdIATMean',
'FwdIATStd',
'FwdIATMax',
'FwdIATMin',
'BwdIATTotal',
'BwdIATMean',
'BwdIATStd',
'BwdIATMax',
'BwdIATMin',
'FwdPSHFlags',
'FwdPackets_s',
'MaxPacketLen',
'PacketLenMean',
'PacketLenStd',
'PacketLenVar',
'FINFlagCount',
'SYNFlagCount',
'PSHFlagCount',
'ACKFlagCount',
'URGFlagCount',
'AvgPacketSize',
'AvgBwdSegmentSize',
'InitWinBytesFwd',
'InitWinBytesBwd',
'ActiveMin',
'IdleMean',
'IdleStd',
'IdleMax',
'IdleMin',
'Src',
'SrcPort',
'Dest',
'DestPort',
'Protocol',
'FlowStartTime',
'FlowLastSeen',
'PName',
'PID',
'Classification',
'Probability',
'Risk']

#features returned by the flow object

ae_features = np.array(['FlowDuration',
'BwdPacketLengthMax',
'BwdPacketLengthMin',
'BwdPacketLengthMean',
'BwdPacketLengthStd',
'FlowIATMean',
'FlowIATStd',
'FlowIATMax',
'FlowIATMin',
'FwdIATTotal',
'FwdIATMean',
'FwdIATStd',
'FwdIATMax',
'FwdIATMin',
'BwdIATTotal',
'BwdIATMean',
'BwdIATStd',
'BwdIATMax',
'BwdIATMin',
'FwdPSHFlags',
'FwdPackets/s',
'PacketLengthMax',
'PacketLengthMean',
'PacketLengthStd',
'PacketLengthVariance',
'FINFlagCount',
'SYNFlagCount',
'PSHFlagCount',
'ACKFlagCount',
'URGFlagCount',
'AveragePacketSize',
'BwdSegmentSizeAvg',
'FWDInitWinBytes',
'BwdInitWinBytes',
'ActiveMin',
'IdleMean',
'IdleStd',
'IdleMax',
'IdleMin'])

flow_count = 0
flow_df = pd.DataFrame(columns =cols)


src_ip_dict = {}

current_flows = {}
FlowTimeout = 600 


ae_scaler = joblib.load("./ML/preprocess_pipeline_AE_39ft.save")
ae_model = keras.models.load_model('./ML/autoencoder_39ft.hdf5')

classifier = joblib.load("./ML/model.pkl")
print(classifier.classes_)

with open('./ML/explainer', 'rb') as f:
    explainer = dill.load(f)

predict_fn_rf = lambda x: classifier.predict_proba(x).astype(float)



def classify(features):
    # preprocess
    global flow_count
    feature_string = [str(i) for i in features[39:]]
    record = features.copy()
    features = [np.nan if x in [np.inf, -np.inf] else float(x) for x in features[:39]]
    

    if feature_string[0] in src_ip_dict.keys():
        src_ip_dict[feature_string[0]] +=1
    else:
        src_ip_dict[feature_string[0]] = 1

    for i in [0,2]:
        ip = feature_string[i] #feature_string[0] is src, [2] is dst
        feature_string[i] = {'ip': ip}

    if np.nan in features:
        return

    # features = normalisation.transform([features])
    result = classifier.predict([features])  
    proba = predict_fn_rf([features])   
    proba_score = [round(proba[0].max(), 2)]
    proba_risk = sum(list(proba[0,1:]))
    if proba_risk >0.8: risk = {"level": "Very High", "color": "red"}
    elif proba_risk >0.6: risk = {"level": "High", "color": "orangered"}
    if proba_risk >0.4: risk = {"level": "Medium", "color": "orange"}
    if proba_risk >0.2: risk = {"level": "Low", "color": "green"}
    else: risk = {"level": "Minimal", "color": "limegreen"}




    classification = [str(result[0])]
    if result != 'Benign':
        print(feature_string + classification + proba_score )

    flow_count +=1
    flow_df.loc[len(flow_df)] = [flow_count]+ record + classification + proba_score + [risk]


    ip_data = {'SourceIP': src_ip_dict.keys(), 'count': src_ip_dict.values()} 
    ip_data= pd.DataFrame(ip_data)
    ip_data=ip_data.to_json(orient='records')

    # socketio.emit('newresult', {'result': feature_string +[z_scores]+ classification, "ips": json.loads(ip_data)}, namespace='/test')
    # print(json.loads(ip_data))
    # # socketio.emit('newresult', {'result': feature_string + classification}, namespace='/test')
    # return feature_string +[z_scores]+ classification

    socketio.emit('newresult', {'result':[flow_count]+ feature_string + classification + proba_score + [risk], "ips": json.loads(ip_data)}, namespace='/test')
    # socketio.emit('newresult', {'result': feature_string + classification}, namespace='/test')
    return [flow_count]+ record + classification + proba_score + [risk]

def newPacket(p):
    try:
        packet = PacketInfo()
        packet.setDest(p)
        packet.setSrc(p)
        packet.setSrcPort(p)
        packet.setDestPort(p)
        packet.setProtocol(p)
        packet.setTimestamp(p)
        packet.setPSHFlag(p)
        packet.setFINFlag(p)
        packet.setSYNFlag(p)
        packet.setACKFlag(p)
        packet.setURGFlag(p)
        packet.setRSTFlag(p)
        packet.setPayloadBytes(p)
        packet.setHeaderBytes(p)
        packet.setPacketSize(p)
        packet.setWinBytes(p)
        packet.setFwdID()
        packet.setBwdID()

        #print(p[TCP].flags, packet.getFINFlag(), packet.getSYNFlag(), packet.getPSHFlag(), packet.getACKFlag(),packet.getURGFlag() )

        if packet.getFwdID() in current_flows.keys():
            flow = current_flows[packet.getFwdID()]

            # check for timeout
            # for some reason they only do it if packet count > 1
            if (packet.getTimestamp() - flow.getFlowLastSeen()) > FlowTimeout:
                classify(flow.terminated())
                del current_flows[packet.getFwdID()]
                flow = Flow(packet)
                current_flows[packet.getFwdID()] = flow

            # check for fin flag
            elif packet.getFINFlag() or packet.getRSTFlag():
                flow.new(packet, 'fwd')
                classify(flow.terminated())
                del current_flows[packet.getFwdID()]
                del flow

            else:
                flow.new(packet, 'fwd')
                current_flows[packet.getFwdID()] = flow

        elif packet.getBwdID() in current_flows.keys():
            flow = current_flows[packet.getBwdID()]

            # check for timeout
            if (packet.getTimestamp() - flow.getFlowLastSeen()) > FlowTimeout:
                classify(flow.terminated())
                del current_flows[packet.getBwdID()]
                del flow
                flow = Flow(packet)
                current_flows[packet.getFwdID()] = flow

            elif packet.getFINFlag() or packet.getRSTFlag():
                flow.new(packet, 'bwd')
                classify(flow.terminated())
                del current_flows[packet.getBwdID()]
                del flow
            else:
                flow.new(packet, 'bwd')
                current_flows[packet.getBwdID()] = flow
        else:

            flow = Flow(packet)
            current_flows[packet.getFwdID()] = flow
            # current flows put id, (new) flow

    except AttributeError:
        # not IP or TCP
        return

    except:
        traceback.print_exc()


def snif_and_detect():

    while not thread_stop_event.isSet():
        print("Begin Sniffing".center(20, ' '))
        sniff(prn=newPacket)
        for f in current_flows.values():
            print(f.terminated())
            classify(f.terminated())


# @app.route('/')
# def index():
#     #only by sending this page first will the client be connected to the socketio instance
#     return render_template('index.html')

@app.route('/api/flow-detail')
def flow_detail():
    flow_id = request.args.get('flow_id', default = -1, type = int) #/flow-detail?flow_id=x
    # print(flow_id)
    flow = flow_df.loc[flow_df['FlowID'] == flow_id]
    # X = normalisation.transform([flow.values[0,1:40]])
    X = [flow.values[0,1:40]] #retrieves all the values of the flow (returned by the flow object) (a row in the table if u will)
    print("\nX: ", X)  
    
    
    choosen_instance = X
    result = classifier.predict(choosen_instance)
    proba_score = list(predict_fn_rf(choosen_instance))
    print(proba_score)
    risk_proba =  sum(proba_score[0][1:])
    if risk_proba >0.8: risk = {"color": "red", "level": "Very High"}
    elif risk_proba >0.6: risk = {"color": "orangered", "level": "High"}
    if risk_proba >0.4: risk = {"color": "orange", "level": "Medium"}
    if risk_proba >0.2: risk = {"color": "green", "level": "Low"}
    else: risk = {"color": "limegreen", "level": "Minimal"}
    exp = explainer.explain_instance(choosen_instance[0], predict_fn_rf, num_features=6, top_labels = 1)
    explanation_details = {
        "class_names": exp.__dict__.get("class_names"),
        "predict_proba": exp.__dict__.get("predict_proba").tolist() 
    }

    X_transformed = ae_scaler.transform(X)
    print("\nX_transformed", X_transformed)

    reconstruct = ae_model.predict(X_transformed)
    print("\nreconstruct", reconstruct)
    err = reconstruct - X_transformed
    abs_err = np.absolute(err)
    
    ind_n_abs_largest = np.argpartition(abs_err, -5)[-5:]
    print("\nind_n_abs_largest", ind_n_abs_largest)

    col_n_largest = ae_features[ind_n_abs_largest]
    # og_n_largest = X[ind_n_abs_largest]
    err_n_largest = err[0][ind_n_abs_largest]
    plot_data = {
        "x": col_n_largest.tolist(),
        "y": err_n_largest.tolist()
    }
    # return render_template('detail.html', tables=[flow.reset_index(drop=True).transpose().to_html(classes='data')], exp=exp.as_html(), ae_plot = plot_div, risk = risk) # titles=flow.columns.values, classifier='RF Classifier'

    result = {
        "flow": flow.reset_index(drop=True).transpose().to_dict(),
        "plot_data":plot_data,
        "exp": explanation_details,
        "risk" : risk,
        "result": result.tolist()[0]
    }

    return result


@app.route("/api/submit-features", methods = ['POST'])
def submit_features():
    data = request.get_json()

    flow = flow_df.loc[flow_df['FlowID'] == 0]

    data = list(data.values())
    np_data = np.array(data)
    np_data = np_data.reshape(1, -1)
    result = classifier.predict([data])  
    proba = predict_fn_rf([data])   
    proba_risk = sum(list(proba[0,1:]))
    if proba_risk >0.8: risk = {"level": "Very High", "color": "red"}
    elif proba_risk >0.6: risk = {"level": "High", "color": "orangered"}
    if proba_risk >0.4: risk = {"level": "Medium", "color": "orange"}
    if proba_risk >0.2: risk = {"level": "Low", "color": "green"}
    else: risk = {"level": "Minimal", "color": "limegreen"}
    # response_data = [result.tolist()[0], proba_score[0], risk]
    # return jsonify(response_data)
    exp = explainer.explain_instance(np_data[0], predict_fn_rf, num_features=6, top_labels = 1)
    explanation_details = {
        "class_names": exp.__dict__.get("class_names"),
        "predict_proba": exp.__dict__.get("predict_proba").tolist() 
    }

    data_transformed = ae_scaler.transform(np_data)
    print("\nX_transformed", data_transformed)

    reconstruct = ae_model.predict(data_transformed)
    print("\nreconstruct", reconstruct)
    err = reconstruct - data_transformed
    abs_err = np.absolute(err)

    ind_n_abs_largest = np.argpartition(abs_err, -5)[-5:]
    print("\nind_n_abs_largest", ind_n_abs_largest)

    col_n_largest = ae_features[ind_n_abs_largest]
    # og_n_largest = X[ind_n_abs_largest]
    err_n_largest = err[0][ind_n_abs_largest]
    plot_data = {
        "x": col_n_largest.tolist(),
        "y": err_n_largest.tolist()
    }
    # return render_template('detail.html', tables=[flow.reset_index(drop=True).transpose().to_html(classes='data')], exp=exp.as_html(), ae_plot = plot_div, risk = risk) # titles=flow.columns.values, classifier='RF Classifier'

    result_data = {
        "flow": flow.reset_index(drop=True).transpose().to_dict(),
        "plot_data":plot_data,
        "exp": explanation_details,
        "risk" : risk,
        "classification":result.tolist()[0]
    }

    return result_data




@socketio.on('connect', namespace='/test')
def test_connect():
    # need visibility of the global thread object
    global thread
    print('Client connected')

    #Start the random result generator thread only if the thread has not been started before.
    if not thread.is_alive():
        print("Starting Thread")
        thread = socketio.start_background_task(snif_and_detect)

@socketio.on('disconnect', namespace='/test')
def test_disconnect():
    print('Client disconnected')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=3000)
