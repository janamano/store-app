FROM python:3.6.1-alpine
RUN pip install flask
RUN pip install cloudant
CMD ["python","server.py"]
COPY server.py /server.py