#  # Diese Datei dient dazu, die Website auf dem Server zu starten.


# 
FROM python:3.9

# 
WORKDIR /code

# 
COPY ./backend/requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./backend /code/app

WORKDIR /code/app
# 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]